type NavLinks = {
  label: string;
  href: string;
  icon?: string;
  textcolor?: string;
};

type HeroProps = {
  id: number;
  title: string;
  description: string;
};

export type EventCardProps = {
  id: string;
  image?: string;
  title: string;
  eventType: "Online" | "Offline";
  date: string;
  ticketType: "Free" | "Paid";
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
    href: "/admin/reviews-management",
    icon: "fa-solid fa-comments",
  },
  {
    label: "Event Categories",
    href: "/admin/event-categories",
    icon: "fa-solid fa-layer-group",
  },
];

export const AdminLogoutLink: NavLinks = {
  label: "Logout",
  href: "/login",
  icon: "fa-solid fa-right-to-bracket",
};

export const UserSidebarLinks: NavLinks[] = [
  { label: "Basic Details", href: "basic" },
  { label: "Professional Details", href: "professional-details" },
  { label: "Events", href: "events" },
  { label: "Your Events", href: "your-events" },
  { label: "Change Password", href: "change-password" },
  { label: "Deactivate Account", href: "deactivate-account" },
];

export const HeroContent: HeroProps[] = [
  {
    id: 0,
    title: "Make Your Events Engaging & Effective!",
    description:
      "One-stop ticketing & event management platform for online, hybrid and in-person events. We help you drive the right audience & make your event more successful",
  },
  {
    id: 1,
    title: "Bring Your Events to Life!",
    description:
      "Seamless solutions for online, hybrid, and in-person events. Create meaningful experiences and maximize your audience engagement with ease.",
  },
  {
    id: 2,
    title: "Where Innovation Meets Events!",
    description:
      "All-in-one event management platform designed to streamline your ticketing, boost attendance, and ensure your event's success.",
  },
  {
    id: 3,
    title: "Transform the Way You Host Events!",
    description:
      "From planning to execution, our platform equips you with tools to connect with your audience and deliver impactful experiences.",
  },
  {
    id: 4,
    title: "The Future of Event Management is Here!",
    description:
      "Empower your events with cutting-edge technology for effortless ticketing, audience engagement, and unparalleled success.",
  },
  {
    id: 5,
    title: "Make Every Event a Success!",
    description:
      "Simplify the way you manage events and captivate your audience with a platform tailored for online, hybrid, and in-person experiences.",
  },
];

export const FeatureCards: { title: string; des: string }[] = [
  {
    title: "Discover Events That Matter to You",
    des: "Explore both local and virtual events, curated for your interests.",
  },
  {
    title: "Host Events with Ease & Maximize Reach",
    des: "Seamlessly create, manage, and promote your events with hassle-free ticketing.",
  },
  {
    title: "Connect & Network with Event Participants",
    des: "Engage with attendees through chat, voice, and video calls, building lasting connections.",
  },
];

export const TrendingEventsList: EventCardProps[] = [
  {
    id: "1",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title:
      "Google Hackathon bfgfdgssssssssssssssssssssssssssfahssdhfgkljasdflgjsdfkl;hjfdskl;ghjdkls;fgjkosdgjskl;",
    image:
      "https://images.unsplash.com/photo-1561347981-969c80cf4463?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title: "Google Hackathon",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title: "Google Hackathon",
    image:
      "https://images.unsplash.com/photo-1578909196400-59f8f8156a05?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "6",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title: "Google Hackathon",
    image:
      "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title: "Google Hackathon",
  },
  {
    id: "5",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title: "Google Hackathon",
  },
  {
    id: "1",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title:
      "Google Hackathon bfgfdgssssssssssssssssssssssssssfahssdhfgkljasdflgjsdfkl;hjfdskl;ghjdkls;fgjkosdgjskl;",
    image:
      "https://images.unsplash.com/photo-1561347981-969c80cf4463?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title: "Google Hackathon",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title: "Google Hackathon",
    image:
      "https://images.unsplash.com/photo-1578909196400-59f8f8156a05?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "6",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title: "Google Hackathon",
    image:
      "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title: "Google Hackathon",
  },
  {
    id: "5",
    date: "10/12/2024",
    eventType: "Online",
    ticketType: "Free",
    title: "Google Hackathon",
  },
];

export const EventFormsList = [
  "basicEventDetails",
  "locationDetails",
  "ticketDetails",
  "eventMedia",
];
