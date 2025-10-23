import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import BadgeIcon from "@mui/icons-material/Badge";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MailIcon from "@mui/icons-material/Mail";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InfoIcon from "@mui/icons-material/Info";

// Admin Sidebar Items list
export const adminSidebarItemsList = [
  { label: "Dashboard", href: "/admin/dashboard", icon: DashboardIcon },
  { label: "Customers", href: "/admin/customers", icon: GroupIcon },
  { label: "Trainers", href: "/admin/trainers", icon: FitnessCenterIcon },
  { label: "Employees", href: "/admin/employees", icon: BadgeIcon },
  { label: "Memberships", href: "/admin/memberships", icon: CardMembershipIcon },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: SubscriptionsIcon },
  { label: "Transactions", href: "/admin/transactions", icon: AccountBalanceIcon },
  { label: "Enquiries", href: "/admin/enquiries", icon: MailIcon },
  { label: "Feedback", href: "/admin/feedback", icon: FeedbackIcon },
  { label: "Offers", href: "/admin/offers", icon: LocalOfferIcon },
  { label: "About", href: "/admin/about", icon: InfoIcon },
];
