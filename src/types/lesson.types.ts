import { Optional } from 'sequelize';

export interface CreateLessonDto {
  id?: string;
  title: string;
  content: string;
  courseId: string;
  duration?: number;
  dateAdded?: Date;
}

export interface LessonResponse {
  id: string;
  title: string;
  content: string;
  courseId: string;
  duration?: number;
  dateAdded?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Optional attributes for creation
export interface LessonCreationAttributes extends Optional<CreateLessonDto, 'id'> {}
