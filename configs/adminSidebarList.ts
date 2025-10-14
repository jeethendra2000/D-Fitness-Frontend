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


// Admin Sidebar Items list
export const adminSidebarItemsList = [
  { label: "Dashboard", href: "/dashboard/admin", icon: DashboardIcon },
  { label: "Customers", href: "/dashboard/admin/customers", icon: GroupIcon },
  { label: "Trainers", href: "/dashboard/admin/trainers", icon: FitnessCenterIcon },
  { label: "Employees", href: "/dashboard/admin/employees", icon: BadgeIcon },
  { label: "Memberships", href: "/dashboard/admin/memberships", icon: CardMembershipIcon },
  { label: "Subscriptions", href: "/dashboard/admin/subscriptions", icon: SubscriptionsIcon },
  { label: "Transactions", href: "/dashboard/admin/transactions", icon: AccountBalanceIcon },
  { label: "Enquiries", href: "/dashboard/admin/enquiries", icon: MailIcon },
  { label: "Feedback", href: "/dashboard/admin/feedback", icon: FeedbackIcon },
  { label: "Offers", href: "/dashboard/admin/offers", icon: LocalOfferIcon },
];
