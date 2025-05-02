import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import SignOutButton from "./SignOutButton";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-2">
          <img src="./Staylio.png" alt="" className="h-14 w-16" />
          <Link to="/" className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl">
              Staylio
            </span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/hotels"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Hotels
                </Link>
                <Link
                  to="/add-hotels"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Dashboard
                </Link>
                <Link
                  to="#"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Deals
                </Link>
              </>
            ) : (
              ""
            )}
            <Link
              to="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <SignOutButton />
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button size="sm" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
