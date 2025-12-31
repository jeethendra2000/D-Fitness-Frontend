export type ApiResponse<T> = {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export enum Gender {
  Male = "Male",
  Female = "Female",
  Others = "Others",
}
export enum Status {
  Active = "Active",
  Inactive = "Inactive",
}
export enum MembershipType {
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  SemiAnnual = "SemiAnnual",
  Annual = "Annual",
  Custom = "Custom",
}
export enum SubscriptionStatus {
  New = "New",
  Inactive = "Inactive",
  Active = "Active",
  Paused = "Paused",
  Expired = "Expired",
  Cancelled = "Cancelled",
}
export enum TransactionType {
  SubscriptionPayment = "SubscriptionPayment",
  Salary = "Salary",
  Expense = "Expense",
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
export enum PaymentType {
  Cash = "Cash",
  UPI = "UPI",
  Card = "Card",
  Wallet = "Wallet",
  NetBanking = "NetBanking",
  Other = "Other",
}
export enum EnquiryStatus {
  New = "New",
  Contacted = "Contacted",
  Resolved = "Resolved",
}

export type Role = {
  id: string;
};

// --- BASE ENTITIES ---

// Base 'Account' Type
export type Account = {
  id: string;
  firstname: string;
  lastname: string;
  fullName?: string; // Optional frontend helper
  email: string;
  phoneNumber: string;
  gender: Gender;
  dateOfBirth: string; // DateOnly ("YYYY-MM-DD")
  address?: string | null;
  // description?: string | null;
  createdOn: string; // DateTime ISO
  profileImageUrl?: string | null;
  profileImageFile?: File | null; // Frontend helper for upload
};

// --- DERIVED ENTITIES ---

// Employee extends Account
export type Employee = Account & {
  jobTitle: string;
  hireDate: string;
  salary: number;
  yearsOfExperience: number;
  bio?: string | null;
  status: Status;
};

// Trainer extends Employee
export type Trainer = Employee & {
  specialization: string;
  certification?: string | null;
  availableFrom?: string | null; // TimeOnly ("HH:mm:ss")
  availableTo?: string | null; // TimeOnly ("HH:mm:ss")
};

// Customer extends Account
export type Customer = Account & {
  height: number;
  weight: number;
  joinedDate: string; // DateOnly ("YYYY-MM-DD")
  trainerRequired: boolean;
  trainerId?: string | null;
};

// --- OTHER ENTITIES ---

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
  membershipId: string;
  startDate: string; // DateOnly
  endDate: string; // DateOnly
  status: SubscriptionStatus;
  createdOn: string;
};
export type Transaction = {
  id: string;
  accountId: string;
  transactionType: TransactionType;
  subscriptionId?: string | null;
  amount: number;
  paymentType: PaymentType;
  paymentReferenceId?: string | null;
  description?: string | null;
  status: TransactionStatus;
  transactionDate: string; // DateTime ISO
  createdOn: string; // DateTime ISO
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
