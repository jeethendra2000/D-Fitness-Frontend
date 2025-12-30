import DashboardIcon from "@mui/icons-material/Dashboard";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InfoIcon from "@mui/icons-material/Info";

// trainer Sidebar Items list
export const trainerSidebarItemsList = [
  { label: "Dashboard", href: "/trainer/dashboard", icon: DashboardIcon },
  {
    label: "Subscriptions",
    href: "/trainer/subscriptions",
    icon: SubscriptionsIcon,
  },
  {
    label: "Transactions",
    href: "/trainer/transactions",
    icon: AccountBalanceIcon,
  },
  { label: "Feedback", href: "/trainer/feedback", icon: FeedbackIcon },
  { label: "About", href: "/trainer/about", icon: InfoIcon },
];
