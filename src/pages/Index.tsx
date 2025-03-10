
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoUploader from "@/components/VideoUploader";
import VideoLibrary from "@/components/VideoLibrary";
import VideoAnalyzer from "@/components/VideoAnalyzer";

interface Video {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
}

const Index = () => {
  const [uploadedVideos, setUploadedVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const handleUploadComplete = (videoId: string, videoName: string, videoUrl: string) => {
    const newVideo = {
      id: videoId,
      name: videoName,
      thumbnail: videoUrl,
      url: videoUrl
    };
    
    setUploadedVideos(prev => [...prev, newVideo]);
    setSelectedVideoId(videoId);
  };

  const selectedVideo = selectedVideoId 
    ? {
        id: selectedVideoId,
        name: uploadedVideos.find(v => v.id === selectedVideoId)?.name || "",
        url: uploadedVideos.find(v => v.id === selectedVideoId)?.url || ""
      }
    : null;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Video Insight AI</h1>
        <p className="text-xl text-muted-foreground">
          Upload videos and find specific moments with natural language queries
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upload">Upload Video</TabsTrigger>
          <TabsTrigger value="analyze">Analyze Video</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <VideoUploader onUploadComplete={handleUploadComplete} />
        </TabsContent>

        <TabsContent value="analyze" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <VideoLibrary 
                videos={uploadedVideos}
                selectedVideoId={selectedVideoId}
                onSelectVideo={setSelectedVideoId}
              />
            </div>

            <div className="md:col-span-2">
              <VideoAnalyzer selectedVideo={selectedVideo} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
