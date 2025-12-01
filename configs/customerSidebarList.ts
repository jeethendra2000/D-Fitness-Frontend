import DashboardIcon from "@mui/icons-material/Dashboard";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InfoIcon from "@mui/icons-material/Info";

// customer Sidebar Items list
export const customerSidebarItemsList = [
  { label: "Dashboard", href: "/customer/dashboard", icon: DashboardIcon },
  {
    label: "Subscriptions",
    href: "/customer/subscriptions",
    icon: SubscriptionsIcon,
  },
  {
    label: "Transactions",
    href: "/customer/transactions",
    icon: AccountBalanceIcon,
  },
  { label: "Feedback", href: "/customer/feedback", icon: FeedbackIcon },
  { label: "About", href: "/customer/about", icon: InfoIcon },
];
