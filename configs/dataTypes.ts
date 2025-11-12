export type ApiResponse<T> = {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export enum Status {
  Active = "Active",
  Inactive = "Inactive",
}

export enum MembershipType {
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  SemiAnnual = "SemiAnnual",
  Annual = "Annual",
}

export enum TransactionType {
  SubscriptionPayment = "SubscriptionPayment",
  Salary = "Salary",
  Refund = "Refund",
  Other = "Other",
}

export enum TransactionStatus {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
  Cancelled = "Cancelled",
  Refunded = "Refunded",
}
export enum PaymentMode {
  Card = "Card",
  NetBanking = "NetBanking",
  Cash = "Cash",
  UPI = "UPI",
  Wallet = "Wallet",
  Other = "Other",
}
export enum EnquiryStatus {
  New = "New",
  Contacted = "Contacted",
  Resolved = "Resolved",
}
export enum FeedbackStatus {
  New = "New",
  Acknowledged = "Acknowledged",
  Resolved = "Resolved",
}

export type Role = {
  id: string;
};

export type Employee = {
  id: string;
  firebase_UID: string;
  jobTitle: string;
  hireDate: string;
  salary: number;
  status: Status;
};

export type Trainer = {
  id: string;
  firebase_UID: string;
  jobTitle: string;
  hireDate: string; // ISO date
  salary: number;
  status: Status;
  reportsToEmployeeID?: string | null;

  // Trainer-specific fields
  specialization: string;
  yearsOfExperience: number;
  bio?: string | null;
  certification?: string | null;
  rating?: number | null;
  availableFrom?: string | null; // "HH:mm:ss"
  availableTo?: string | null; // "HH:mm:ss"
};

export type Customer = {
  id: string; // From RetrieveCustomerDto (Guid)
  firebase_UID: string; // Required, max length 100
  height: number; // Range: 0–300
  weight: number; // Range: 0–300
  trainerRequired: boolean; // Default false
  trainerId: string | null; // Nullable Guid
};

export type Membership = {
  id: string;
  name: string;
  description: string;
  amount: number;
  duration: number;
  type: MembershipType;
  status: Status;
};

export type Subscription = {
  id: string;
  customerId: string;
  membershipID: string;
  startDate: string;
  endDate: string;
  status: Status;
  autoRenew: boolean;
};

export type Transaction = {
  id: string; // From the example data
  payerId: string;
  payeeId: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  subscriptionId: string | null;
  description: string | null;
  paymentGatewayId: string | null;
  createdOn: string; // From the example data
};

export type Enquiry = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: EnquiryStatus;
  submittedAt: string;
};

export type Feedback = {
  id: string;
  firebase_UID: string | null;
  subject: string | null;
  message: string | null;
  rating: number | null;
  status: FeedbackStatus;
  submittedAt: string;
};

export type Offer = {
  id: string;
  code: string;
  description: string;
  // NOTE: Only one of these two fields should be populated at any time.
  discountPercentage: number | null;
  discountAmount: number | null;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  status: Status;
};
