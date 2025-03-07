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
        href: "/users",
        label: "Users",
        icons: Users,
        query: null,
      },
      {
        href: "/roles",
        label: "Roles & Permissions",
        icons: UserCog,
        query: null,
      },
    ],
  },
];
export const PSGC = {
  regions: [
    {
      id: "01",
      name: "Ilocos Region",
      provinces: [
        {
          id: "0101",
          name: "Ilocos Norte",
          lgus: [
            { id: "010101", name: "Laoag City" },
            { id: "010102", name: "Batac City" },
            { id: "010103", name: "San Nicolas" },
          ],
        },
        {
          id: "0102",
          name: "Ilocos Sur",
          lgus: [
            { id: "010201", name: "Vigan City" },
            { id: "010202", name: "Candon City" },
            { id: "010203", name: "Narvacan" },
          ],
        },
      ],
    },
    {
      id: "03",
      name: "Central Luzon",
      provinces: [
        {
          id: "0301",
          name: "Pampanga",
          lgus: [
            { id: "030101", name: "San Fernando City" },
            { id: "030102", name: "Angeles City" },
            { id: "030103", name: "Mabalacat City" },
          ],
        },
        {
          id: "0302",
          name: "Tarlac",
          lgus: [
            { id: "030201", name: "Tarlac City" },
            { id: "030202", name: "Capas" },
            { id: "030203", name: "Concepcion" },
          ],
        },
      ],
    },
  ],
};
