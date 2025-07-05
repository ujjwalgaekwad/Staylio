import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import Profile from "./Profile";

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAppContext();
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setScrolled(window.scrollY > 10);
      }
    };

    if (!isHomePage) {
      setScrolled(true);
    } else {
      setScrolled(window.scrollY > 10);
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-white shadow text-black" : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-4 md:px-8">
        <div className="flex justify-between items-center gap-4">
          <div className="flex justify-center items-center">
            <img className="h-10" src="./Staylio.png" alt="Logo" />
            <Link to="/" className="hidden md:block text-2xl font-bold tracking-tight">
              Staylio
            </Link>
          </div>
          <nav className="hidden md:flex gap-4 text-sm font-medium">
            <Link to="/">Home</Link>
            {isLoggedIn && <Link to="/search">Hotels</Link>}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Profile />
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className={`transition-all ${
                  scrolled
                    ? "bg-white text-black border-gray-300"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className={`transition-all ${
                  scrolled ? "bg-black text-white" : "bg-white text-black"
                }`}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavigationBar;
