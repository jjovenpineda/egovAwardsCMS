import {
  ChartBar,
  FileType,
  Folder,
  FolderArchive,
  FolderCheck,
  FolderLock,
  HelpCircle,
  House,
  LayoutDashboard,
  ListChecks,
  ListTodo,
  LucideLink,
  Map,
  MapPin,
  MenuSquare,
  MessageCircle,
  Settings,
  Table,
  Unlock,
  UserCog,
  Users,
} from "lucide-react";

export const links = [
  {
    category: "Main",
    icons: LayoutDashboard,
    items: [
      {
        href: "/",
        label: "Dashboard",
        icons: LayoutDashboard,
        query: null,
      },
    ],
  },
  {
    category: "Entries",
    icons: MapPin,
    items: [
      {
        href: "/entries",
        label: "All Entries",
        icons: MenuSquare,
        query: { filter: "all" },
      },
      {
        href: "/entries",
        label: "For Review",
        icons: ListTodo,
        query: { filter: "review" },
      },
      {
        href: "/entries",
        label: "Graded",
        icons: ListChecks,
        query: { filter: "graded" },
      },
      {
        href: "/entries",
        label: "Final",
        icons: FolderCheck,
        query: { filter: "final" },
      },
    ],
  },

  {
    category: "SETTINGS",
    icons: MapPin,
    items: [
      {
        href: "#####",
        label: "Account Settings",
        icons: Settings,
        query: null,
      },
    ],
  },
  {
    category: "ACCESS CONTROL",
    icons: MapPin,
    items: [
      {
        href: "######",
        label: "Users",
        icons: Users,
        query: null,
      },
      {
        href: "#######",
        label: "Roles",
        icons: UserCog,
        query: null,
      },
      {
        href: "########",
        label: "Permission Group",
        icons: FolderLock,
        query: null,
      },
      {
        href: "#########",
        label: "Permissions",
        icons: Unlock,
        query: null,
      },
    ],
  },
];
