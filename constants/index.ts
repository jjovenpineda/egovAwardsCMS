import {
  Building2,
  FolderCheck,
  LayoutDashboard,
  ListChecks,
  ListTodo,
  MapPin,
  MenuSquare,
  Paperclip,
  Settings,
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
      {
        href: "/registrations",
        label: "Registrations",
        icons: Paperclip,
        query: null,
      },
      {
        href: "/participants",
        label: "Participants",
        icons: Building2,
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
        query: { filter: "All" },
      },
      {
        href: "/entries",
        label: "For Review",
        icons: ListTodo,
        query: { filter: "For Review" },
      },
      {
        href: "/entries",
        label: "Graded",
        icons: ListChecks,
        query: { filter: "Graded" },
      },
      {
        href: "/entries",
        label: "Final",
        icons: FolderCheck,
        query: { filter: "Final" },
      },
    ],
  },

  {
    category: "SETTINGS",
    icons: MapPin,
    items: [
      {
        href: "/settings",
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
export const permissions = [
  {
    name: "Entries",
    options: [
      "Edit",
      "Score",
      "View",
      "Download",
      "Email Notice",
      "View Ranking Summary (Dashboard)",
      "Download Ranking Summary (Dashboard)",
      "View List of Participants",
      "Download List of Participants",
    ],
  },

  {
    name: "Users",
    options: ["Edit", "Score", "View", "Download"],
  },
  {
    name: "Roles",
    options: ["Edit", "Score", "View", "Download"],
  },
  {
    name: "Content",
    options: ["Edit", "Score", "View", "Download"],
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
export const entriesFilterOptions = [
  {
    title: "FILTER BY STATUS",
    options: [
      { id: "status-select-all", label: "Select All" },
      { id: "status-review", label: "For Review" },
      { id: "status-graded", label: "Graded" },
    ],
  },
  {
    title: "FILTER BY CATEGORY",
    options: [
      { id: "category-select-all", label: "Select All" },
      { id: "category-g2a", label: "G2A" },
      { id: "category-g2b", label: "G2B" },
      { id: "category-g2c", label: "G2C" },
      { id: "category-g2d", label: "G2D" },
      { id: "category-g2e", label: "G2E" },
    ],
  },
  {
    title: "FILTER BY SDGs",
    options: [
      { id: "sdg-select-all", label: "Select All" },
      { id: "sdg-no-poverty", label: "No Poverty" },
      { id: "sdg-zero-hunger", label: "Zero Hunger" },
      {
        id: "sdg-good-health",
        label: "Good Health and Well-being",
      },
      {
        id: "sdg-quality-education",
        label: "Quality Education",
      },
      { id: "sdg-gender-equality", label: "Gender Equality" },
      {
        id: "sdg-clean-water",
        label: "Clean Water and Sanitation",
      },
      {
        id: "sdg-affordable-energy",
        label: "Affordable and Clean Energy",
      },
      {
        id: "sdg-decent-work",
        label: "Decent Work and Economic Growth",
      },
      {
        id: "sdg-industry",
        label: "Industry, Innovation, and Infrastructure",
      },
      {
        id: "sdg-reduced-inequalities",
        label: "Reduced Inequalities",
      },
      {
        id: "sdg-sustainable-cities",
        label: "Sustainable Cities and Communities",
      },
      {
        id: "sdg-responsible-consumption",
        label: "Responsible Consumption and Production",
      },
      { id: "sdg-climate-action", label: "Climate Action" },
      {
        id: "sdg-life-below-water",
        label: "Life Below Water",
      },
      { id: "sdg-life-on-land", label: "Life on Land" },
      {
        id: "sdg-peace-justice",
        label: "Peace, Justice, and Strong Institutions",
      },
      {
        id: "sdg-partnerships",
        label: "Partnerships for the Goals",
      },
    ],
  },
  {
    title: "FILTER BY REGIONS",
    options: [
      { id: "region-select-all", label: "Select All" },
      { id: "region-ncr", label: "NCR" },
      { id: "region-car", label: "CAR" },
      { id: "region-1", label: "Region 1" },
      { id: "region-3", label: "Region 3" },
      { id: "region-4a", label: "Region 4A" },
      { id: "region-4b", label: "Region 4B" },
      { id: "region-5", label: "Region 5" },
      { id: "region-6", label: "Region 6" },
      { id: "region-8", label: "Region 8" },
      { id: "region-9", label: "Region 9" },
      { id: "region-11", label: "Region 11" },
      { id: "region-12", label: "Region 12" },
      { id: "region-13", label: "Region 13" },
      { id: "region-barmm", label: "BARMM" },
    ],
  },
];
