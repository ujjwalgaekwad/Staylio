import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import SignOutButton from "./SignOutButton";
import React from "react";

interface NavLinkItem {
  to: string;
  label: string;
  requiresAuth: boolean;
}

const NAV_LINKS: NavLinkItem[] = [
  { to: "/", label: "Home", requiresAuth: false },
  { to: "/search", label: "Hotels", requiresAuth: true },
  { to: "/add-hotels", label: "Dashboard", requiresAuth: true },
  { to: "/my-bookings", label: "Bookings", requiresAuth: true },
];

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();

  const renderNavLinks = () =>
    NAV_LINKS.filter(link => !link.requiresAuth || isLoggedIn).map(link => (
      <NavLink
        key={link.to}
        to={link.to}
        className={({ isActive }) =>
          `text-sm transition-colors ${
            isActive ? "text-white" : "text-gray-300"
          } hover:text-[#ddd6d6]`
        }
      >
        {link.label}
      </NavLink>
    ));

  return (
    <header className="w-full py-4 bg-blue-800 border-b border-gray-400">
      <nav className="mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-white">
            Staylio
          </Link>
          <div className="flex items-center gap-4">
            {renderNavLinks()}
          </div>
        </div>
        <div className="flex items-center gap-3">
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
      </nav>
    </header>
  );
};

export default NavigationBar;
