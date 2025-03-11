
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileVideo, Home } from "lucide-react";

const MainNav = () => {
  const location = useLocation();
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <FileVideo className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">VideoInsight</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link to="/">
            <Button variant={location.pathname === "/" ? "default" : "ghost"}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/analyze">
            <Button variant={location.pathname === "/analyze" ? "default" : "ghost"}>
              <FileVideo className="h-4 w-4 mr-2" />
              Analyze Videos
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default MainNav;
