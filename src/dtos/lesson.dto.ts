import { Optional } from 'sequelize';

export interface CreateLessonDto {
  title: string;
  content: string;
  course_id: string;
  duration?: number;
  order?: number;
}

export interface LessonResponse {
  id: string;
  title: string;
  content: string;
  courseId: string;
  duration?: string;
  // order?: number;
  createdAt: Date;
  updatedAt: Date;
}