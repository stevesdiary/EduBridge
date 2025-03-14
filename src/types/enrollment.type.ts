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
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export enum EnrollmentStatus {
  ENROLLED = 'enrolled',
  COMPLETED = 'completed',
  WITHDRAWN = 'withdrawn'
}