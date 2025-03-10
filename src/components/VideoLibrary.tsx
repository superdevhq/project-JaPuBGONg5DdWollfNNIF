
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Video {
  id: string;
  name: string;
  thumbnail: string;
}

interface VideoLibraryProps {
  videos: Video[];
  selectedVideoId: string | null;
  onSelectVideo: (videoId: string) => void;
}

const VideoLibrary = ({ videos, selectedVideoId, onSelectVideo }: VideoLibraryProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Your Videos</CardTitle>
        <CardDescription>
          Select a video to analyze
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {videos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No videos uploaded yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Upload a video to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {videos.map((video) => (
              <div 
                key={video.id}
                className={`p-3 rounded-md cursor-pointer flex items-center space-x-3 ${selectedVideoId === video.id ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted'}`}
                onClick={() => onSelectVideo(video.id)}
              >
                <div className="w-16 h-9 bg-muted rounded overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{video.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoLibrary;
