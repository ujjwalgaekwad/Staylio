import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className="container mx-auto px-10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <span>StayEase</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              to=""
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Destinations
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              to="#"
              className="text-sm font-medium hover:text-primary transition-colors hidden md:block cursor-pointer"
            >
              <Button variant={"outline"}>Sign In</Button>
            </Link>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              Sign Up
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
