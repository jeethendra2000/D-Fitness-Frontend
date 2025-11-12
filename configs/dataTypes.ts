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
