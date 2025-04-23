import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAppContext } from "@/contexts/AppContext";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  return (
    <div className="container mx-auto px-10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <span>StayEase</span>
          </Link>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link to="/my-booking">Booking</Link>
                <Link to="/my-hotels">Hotels</Link>
                <Button>Sign out</Button>
              </>
            ) : (
              <Button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                Sign Up
              </Button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
