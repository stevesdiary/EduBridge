export interface CreateEnrollmentDto {
  userId: string;
  courseId: string;
  status: 'ENROLLED' | 'COMPLETED' | 'WITHDRAWN';
  userEmail: string;
}

export interface UpdateEnrollmentDto {
  status?: 'ENROLLED' | 'COMPLETED' | 'WITHDRAWN';
  completionDate?: Date;
  progress?: number;
}