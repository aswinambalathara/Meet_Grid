type NavLinks = {
  label: string;
  href: string;
  icon?: string;
};

export const AdminSidebarLinks: NavLinks[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "fa-brands fa-slack",
  },
  {
    label: "User Management",
    href: "/admin/user-management",
    icon: "fa-solid fa-users",
  },
  {
    label: "Event Management",
    href: "/admin/event-management",
    icon: "fa-solid fa-sitemap",
  },
  {
    label: "Ticket Management",
    href: "/admin/ticket-management",
    icon: "fa-solid fa-ticket",
  },
  {
    label: "Feedback & Reviews",
    href: "/admin/review-management",
    icon: "fa-solid fa-comments",
  },
  {
    label: "Event Categories",
    href: "/admin/event-categories",
    icon: "fa-solid fa-layer-group",
  },

];

export const AdminLogoutLink:NavLinks = {

    label: "Logout",
    href: "/login",
    icon: "fa-solid fa-right-to-bracket",

}
