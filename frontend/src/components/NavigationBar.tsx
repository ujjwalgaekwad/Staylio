import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function NavigationBar() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", auth: false },
    { to: "/search", label: "Hotels", auth: true },
    { to: "/add-hotels", label: "Dashboard", auth: true },
    { to: "/my-bookings", label: "Bookings", auth: true },
  ];

  return (
    <header className="fixed w-full py-3 bg-background shadow-sm text-foreground">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-primary">
          Staylio
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ to, label, auth }) =>
            !auth || isLoggedIn ? (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                {label}
              </NavLink>
            ) : null
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <SignOutButton />
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
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

        <button
          className="md:hidden text-muted-foreground hover:text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {mobileMenuOpen && (
        <nav className="md:hidden mt-3 space-y-2">
          {navLinks.map(({ to, label, auth }) =>
            !auth || isLoggedIn ? (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </NavLink>
            ) : null
          )}
          <div className="mt-2">
            {isLoggedIn ? (
              <SignOutButton />
            ) : (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="w-full" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button size="sm" className="w-full" onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default NavigationBar;
