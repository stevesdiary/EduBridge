import { Optional } from 'sequelize';
export interface LessonCreationData {
  title: string;
  content: string;
  moduleId: string;
  instructor: string;
  resourceUrl: string;
  category: string;
}

export interface LessonAttributes {
  id: string;
  title: string;
  category: string;
  content: string;
  moduleId: string;
  instructor?: string;
  resourceUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LessonResponse {
  id: string;
  title: string;
  description: string;
  content: string;
  moduleId: string;
  category: string;
  instructor: string;
  resourceUrl: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  status: 'success' | 'fail' | 'error';
  message: string;
  data: T | null;
}

export interface LessonCreationAttributes extends Optional<LessonAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  // Add any additional fields needed during creation
}

export interface LessonResponse extends Omit<LessonAttributes, 'createdAt' | 'updatedAt'> {}
