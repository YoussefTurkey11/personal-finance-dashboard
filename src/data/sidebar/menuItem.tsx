import {
  BadgePlus,
  CircleUserRound,
  LayoutDashboard,
  Receipt,
  Scroll,
} from "lucide-react";

export type SidebarItem = {
  id: string;
  name: string;
  link?: string;
  icon: React.ReactNode;
  nested?: SidebarItem[];
};

export const menuItem: SidebarItem[] = [
  {
    id: "dashboard",
    name: "dashboard",
    link: "admin",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "Transactions",
    name: "Transactions",
    icon: <Receipt size={20} />,
    nested: [
      {
        id: "allTransaction",
        name: "All Transactions",
        link: "allTransaction",
        icon: <Scroll size={20} />,
      },
      {
        id: "addTransaction",
        name: "Add Transaction",
        link: "addTransaction",
        icon: <BadgePlus size={20} />,
      },
    ],
  },
  {
    id: "users",
    name: "users",
    link: "users",
    icon: <CircleUserRound size={20} />,
  },
];
