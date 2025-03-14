import { Optional } from 'sequelize';

export interface CreateLessonDto {
  id?: string;
  title: string;
  content: string;
  course_id: string;
  duration?: number;
  date_added?: Date;
}

export interface LessonResponse {
  id: string;
  title: string;
  content: string;
  course_id: string;
  duration?: number;
  date_added?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Optional attributes for creation
export interface LessonCreationAttributes extends Optional<CreateLessonDto, 'id'> {}
