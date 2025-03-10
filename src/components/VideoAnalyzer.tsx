
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import VideoPlayer from "./VideoPlayer";
import { analyzeVideo, VideoAnalysisResult, timestampToSeconds } from "@/utils/videoAnalysis";

interface VideoAnalyzerProps {
  selectedVideo: {
    id: string;
    name: string;
    url: string;
  } | null;
}

const VideoAnalyzer = ({ selectedVideo }: VideoAnalyzerProps) => {
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<VideoAnalysisResult[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty query",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    if (!selectedVideo) {
      toast({
        title: "No video selected",
        description: "Please select a video to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResults([]);

    try {
      // Call the analyze function from our utility
      const analysisResults = await analyzeVideo(selectedVideo.id, query);
      setResults(analysisResults);
      
      toast({
        title: "Analysis complete",
        description: `Found ${analysisResults.length} moments matching your query`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your video",
        variant: "destructive",
      });
      console.error("Video analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const seekToTimestamp = (timestamp: string) => {
    const timeInSeconds = timestampToSeconds(timestamp);
    setCurrentTime(timeInSeconds);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Video Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedVideo ? (
            <VideoPlayer 
              src={selectedVideo.url} 
              onTimeUpdate={(time) => setCurrentTime(time)}
            />
          ) : (
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Select a video to preview</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ask About Your Video</CardTitle>
          <CardDescription>
            Describe what you're looking for in the video
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="E.g., 'Find me the moment where there was a guy with a blue shirt'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSearch} 
            disabled={!selectedVideo || !query.trim() || isAnalyzing}
            className="w-full"
          >
            <Search className="mr-2 h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Search Video"}
          </Button>
        </CardFooter>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Found {results.length} moments matching your query
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="flex space-x-4">
                  <div 
                    className="w-32 h-20 bg-muted rounded overflow-hidden cursor-pointer relative"
                    onClick={() => seekToTimestamp(result.timestamp)}
                  >
                    <img 
                      src={result.thumbnailUrl} 
                      alt={`Thumbnail at ${result.timestamp}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="bg-black/70 text-white text-xs px-1 py-0.5 absolute bottom-0 right-0 rounded-tl">
                      {result.timestamp}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span 
                        className="text-sm font-medium text-primary cursor-pointer hover:underline"
                        onClick={() => seekToTimestamp(result.timestamp)}
                      >
                        {result.timestamp}
                      </span>
                      <span className="text-xs ml-2 text-muted-foreground">
                        {(result.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                    <p className="text-sm">{result.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoAnalyzer;
