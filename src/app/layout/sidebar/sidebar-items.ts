import {RouteInfo} from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "MENU",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: ["All"],
    submenu: [],
  },

  // Admin Modules
  {
    path: "/admin/dashboard/main",
    title: "DASHBOARD",
    iconType: "feather",
    icon: "monitor",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [],
  },

  // Client Modules
  {
    path: "/client/dashboard",
    title: "MENUITEMS.CLIENT.DASHBOARD",
    iconType: "feather",
    icon: "airplay",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Client"],
    submenu: [],
  },

  // Projects Secretariat Admin
  {
    path: "",
    title: "Secretariat",
    iconType: "feather",
    icon: "book-open",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/project-secretariat/board",
        title: "Projects secretariat board",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },

  // Projects Admin
  {
    path: "",
    title: "Projects",
    iconType: "material",
    icon: "folder",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/project-production/board",
        title: "Projects board",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },

  // Departments Admin
  {
    path: "",
    title: "Departments",
    iconType: "feather",
    icon: "grid",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/department/management",
        title: "Department management",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },

  // Clients Admin
  {
    path: "",
    title: "Clients",
    iconType: "feather",
    icon: "user",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/client/board",
        title: "Clients board",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },

  // User Admin
  {
    path: "",
    title: "Users",
    iconType: "feather",
    icon: "users",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/user/board",
        title: "Users board",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },

  {
    path: "/admin/calendar/dashboard",
    title: "Calendar",
    iconType: "feather",
    icon: "calendar",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [],
  },

  // Employee Modules
  {
    path: "/employee/dashboard/main",
    title: "Dashboard",
    iconType: "feather",
    icon: "airplay",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Employee"],
    submenu: [],
  },

  // Projects Employee
  /*{
    path: "",
    title: "Projects",
    iconType: "feather",
    icon: "book",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Employee"],
    submenu: [
      {
        path: "/employee/project-production/board",
        title: "Projects board",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },*/

  // Departments Employee
  {
    path: "",
    title: "Departments",
    iconType: "feather",
    icon: "grid",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Employee"],
    submenu: []
  },

];
