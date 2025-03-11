
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileVideo, Search, Clock, Zap, Shield, Brain } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tight">
                Find Any Moment in Your Videos with AI
              </h1>
              <p className="text-xl text-muted-foreground">
                Upload your videos and use natural language to find exactly what you're looking for. 
                No more scrubbing through hours of footage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/analyze">
                  <Button size="lg" className="w-full sm:w-auto">
                    <FileVideo className="mr-2 h-5 w-5" />
                    Analyze Videos
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/placeholder.svg" 
                  alt="Video Analysis Demo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 text-white px-4 py-2 rounded-lg">
                    <p className="font-medium">Demo Video</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Powered by AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How VideoInsight Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform makes finding moments in videos as easy as asking a question
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="space-y-1">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <FileVideo className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Upload Your Videos</CardTitle>
                <CardDescription>
                  Upload videos from your device in just a few clicks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Support for all common video formats including MP4, MOV, and AVI. 
                  No complicated settings or configurations needed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Ask in Plain Language</CardTitle>
                <CardDescription>
                  Describe what you're looking for in natural language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No need for timestamps or technical terms. Just ask "Find the scene with a red car" 
                  or "Show me when someone is wearing a blue shirt."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Get Instant Results</CardTitle>
                <CardDescription>
                  Jump directly to the moments that match your query
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI analyzes your video and returns precise timestamps where your 
                  search terms appear, with confidence scores for each result.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose VideoInsight</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique advantages for anyone working with video content
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Find what you need in seconds instead of hours. No more manual scrubbing through videos.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">AI-Powered Understanding</h3>
                <p className="text-muted-foreground">
                  Our advanced AI understands context and visual elements, not just basic metadata.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Privacy First</h3>
                <p className="text-muted-foreground">
                  Your videos remain private and secure. We never share your content with third parties.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileVideo className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Works with Any Video</h3>
                <p className="text-muted-foreground">
                  Compatible with all common video formats and resolutions, from smartphone clips to professional footage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform How You Work with Videos?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start analyzing your videos with AI today. No credit card required.
          </p>
          <Link to="/analyze">
            <Button size="lg" variant="secondary" className="px-8">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileVideo className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">VideoInsight</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} VideoInsight AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
