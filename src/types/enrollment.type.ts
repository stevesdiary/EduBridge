export interface EnrollmentResponse {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  startDate: Date;
  completionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  course?: {
    id: string;
    title: string;
    description: string;
    status: string;
    category: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
  totalEnrollments?: number;
  currentPage?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export enum EnrollmentStatus {
  ENROLLED = 'enrolled',
  COMPLETED = 'completed',
  WITHDRAWN = 'withdrawn'
}