"use client";

import NotificationIcon from "@/components/shared/NotificationIcon";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { toggleSidebar, toggleSidebarMobile } from "@/redux/slices/uiSlice";
import { useAppDispatch } from "@/redux/store";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMenuClick = () => {
    if (isMobile) {
      dispatch(toggleSidebarMobile());
    } else {
      dispatch(toggleSidebar());
    }
  };

  return (
    <header className="p-5 border-b border-border flex items-center justify-between bg-card">
      {/* Left */}
      <div className="flex items-center gap-5">
        <Button variant="ghost" onClick={handleMenuClick}>
          <Menu size={24} />
        </Button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <NotificationIcon />
        <div className="w-px h-8 bg-border hidden sm:block"></div>
        <UserAvatar />
      </div>
    </header>
  );
};

export default Header;
