"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ collapsed }: { collapsed?: boolean }) => {
  const { theme } = useTheme();

  return (
    <Link
      href={"/admin"}
      className={`flex items-center gap-2 ${collapsed ? "" : "px-5"} pb-5 border-b border-border`}
    >
      <Image
        src={"/images/transaction.png"}
        width={40}
        height={40}
        alt="logo"
        loading="eager"
      />
      {!collapsed && (
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">Personal Financial</h3>
          <p className="text-sm text-muted-foreground">Dashboard</p>
        </div>
      )}
    </Link>
  );
};

export default Logo;
