export type Role = {
  id: string;
};

export type Trainer = {
  id: string;
  experience: number;
  availableFrom: string; // "HH:mm:ss" format
  availableTo: string; // "HH:mm:ss" format
  users: any[]; // Can be typed if you have user details, else keep any[]
  dateOfBirth: string; // "YYYY-MM-DD" or placeholder "0001-01-01"
  gender: number; // 0,1,2 - use enum if you want
  joinedDate: string;
  createdOn: string; // ISO datetime string
};

export type Customer = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // "YYYY-MM-DD"
  gender: number; // 0,1,2 etc.
  height: number; // in cm
  weight: number; // in kg
  trainerRequired: boolean;
  trainer: Trainer;
  joinedDate: string; // "YYYY-MM-DD"
  createdOn: string; // ISO datetime string
  role: Role;
};

export type ApiResponse = {
  data: Customer[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
