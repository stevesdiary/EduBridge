export interface CreateEnrollmentDto {
  userId: string;
  courseId: string;
  startDate?: Date;
  status?: 'ENROLLED' | 'COMPLETED' | 'WITHDRAWN';
}

export interface UpdateEnrollmentDto {
  status?: 'ENROLLED' | 'COMPLETED' | 'WITHDRAWN';
  completionDate?: Date;
  progress?: number;
}