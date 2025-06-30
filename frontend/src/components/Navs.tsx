import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import SignOutButton from "./SignOutButton";

function Navs() {
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
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Staylio
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/">
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/search">Hotels</Link>
              <Link to="/add-hotels">Dashboard</Link>
              <Link to="/my-bookings">Bookings</Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <SignOutButton scrolled={scrolled}/>
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

export default Navs;
