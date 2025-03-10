
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileVideo, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VideoUploaderProps {
  onUploadComplete: (videoId: string, videoName: string, videoUrl: string) => void;
}

const VideoUploader = ({ onUploadComplete }: VideoUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a video file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 300);

    // Simulate upload completion after 3 seconds
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      // Simulate processing
      setIsUploading(false);
      setIsProcessing(true);
      
      // After 2 seconds, complete processing
      setTimeout(() => {
        setIsProcessing(false);
        
        // Add to uploaded videos
        const videoId = `video-${Date.now()}`;
        const videoUrl = URL.createObjectURL(selectedFile);
        
        onUploadComplete(videoId, selectedFile.name, videoUrl);
        setSelectedFile(null);
        
        toast({
          title: "Upload complete",
          description: "Your video has been uploaded and processed successfully",
        });
        
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 2000);
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload a New Video</CardTitle>
        <CardDescription>
          Upload your video file to analyze its content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <FileVideo className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-2">
            Click to select or drag and drop your video file
          </p>
          <p className="text-sm text-muted-foreground">
            Supports MP4, MOV, AVI up to 500MB
          </p>
          <Input 
            ref={fileInputRef}
            type="file" 
            accept="video/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>

        {selectedFile && (
          <div className="bg-muted p-3 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <FileVideo className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium truncate max-w-[300px]">
                {selectedFile.name}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
        )}

        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        {isProcessing && (
          <div className="bg-muted p-3 rounded-md text-center">
            <p className="text-sm mb-2">Processing video...</p>
            <p className="text-xs text-muted-foreground">
              This may take a few minutes depending on the video length
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || isUploading || isProcessing}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Video
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoUploader;
