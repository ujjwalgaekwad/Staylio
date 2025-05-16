import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import SignOutButton from "./SignOutButton";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  return (
    <header className="w-full flex justify-between items-center mb-6 px-2 md:px-0 text-white">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold text-white">
          Staylio
        </Link>
        <nav className="hidden md:flex gap-5 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link
                to="/search"
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                Hotels
              </Link>
              <Link
                to="/add-hotels"
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/my-bookings"
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                Bookings
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <SignOutButton />
        ) : (
          <>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-white text-black hover:bg-white/90"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
