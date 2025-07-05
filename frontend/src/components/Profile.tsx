import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, ListOrdered, LogOut } from "lucide-react";

import { fetchCurrentUser } from "@/utils/api";
import { UserType } from "@/types/Types";
import SignOutButton from "./SignOutButton";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: user, isLoading, isError } = useQuery<UserType>({
    queryKey: ["fetchCurrentUser"],
    queryFn: fetchCurrentUser,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return null;
  if (isError || !user) return null;

  const pages = [
    {
      name: "Add Hotels",
      icon: <LayoutDashboard size={16} />,
      type: "link",
      href: "/add-hotels",
    },
    {
      name: "Bookings",
      icon: <ListOrdered size={16}/>,
      type: "link",
      href: "/my-bookings"
    },
    {
      name: "Log out",
      icon: <LogOut size={16} />,
      type: "component",
      component: SignOutButton,
    },
  ];

  return (
    <div ref={wrapperRef} className="relative inline-block text-left">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="w-9 h-9 bg-white hover:bg-amber-50 text-black rounded-full cursor-pointer flex items-center justify-center font-semibold border"
      >
        {user.firstName[0]}
      </div>
      <div
        className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 transform transition-all duration-200 origin-top-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="px-3 py-2 border-b border-gray-200 text-black font-medium truncate">
          {`${user.firstName} ${user.lastName}`}
        </div>

        <div className="flex flex-col">
          {pages.map((page, index) => (
            <div key={index} className="w-full">
              {page.type === "link" ? (
                <Link to={page.href!}>
                  <button
                    className="w-full flex items-center cursor-pointer gap-2 px-3 py-2 text-sm text-black hover:bg-gray-100 text-left"
                    onClick={() => setOpen(false)}
                  >
                    {page.icon}
                    {page.name}
                  </button>
                </Link>
              ) : (
                <div className="w-full">
                  {(() => {
                    const Component = page.component;
                    return Component ? <Component /> : null;
                  })()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
