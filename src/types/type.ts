import { Request, Response } from 'express';
import { Role } from '../models/user.model';
import { DifficultyLevel } from '../models/course.model';


export interface UserAttributes {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
}

export interface UserData extends Omit<UserAttributes, 'id'> {
  confirm_password?: string;
}

export interface CourseResponse {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  instructor: string | null;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRequest extends Request {
  body: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
  };
}

export interface ResetPasswordData extends Request {
  body:{
    email: string;
    password: string;
    confirm_password: string;
  }
}

export interface UpdateUserRequest extends Request {
  body: {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    role?: Role

  };
}

import { Optional } from 'sequelize';
import resetPassword from '../services/password.reset.service';

export interface CourseAttributes {
  id?: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CourseCreationData = Optional<CourseAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export interface ApiResponse<T> {
  statusCode: number;
  status: 'success' | 'error' | 'fail';
  message: string;
  data: T | null;
}

export interface VerifyRequest extends Request {
  body: {
    email: string;
    code: string;
  }
}

export interface UserData {
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

export interface UserResponse {
  statusCode: number;
  status: 'success' | 'fail' | 'error';
  message: string;
  data: string[] | null;
}

export interface UserController {
  create(req: UserRequest, res: Response): Promise<Response>;
  updateUser(req: UpdateUserRequest, res: Response): Promise<Response>;
}
export interface ServiceResponse {
  statusCode: number;
  status: string;
  message: string;
  data: unknown | any[];
}
export interface UserResponseData {
  statusCode: number;
  status: string, // 'success' | 'fail' | 'error';
  message: string;
  data: unknown | null;
}

export interface EmailPayload {
  to: string;
  subject: string;
  text: string;
};

export interface EmailResponse {
  statusCode: number;
  status: string;
  message: string;
  data: unknown;
}

export interface loginData {
  email: string;
  password: string;
}

export interface UserRole {
  id: string;
  email: string;
  role: string[];
}

export interface ValidationResult {
  email: string;
  code: string;
}

export interface VerificationResponse {
  statusCode: number;
  status: string;
  message: string;
  data?: unknown;
}

export interface VerificationRequestBody {
  email: string;
  code: string
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface SearchData {
  title?: string;
  subject?: string;
  category: string;
  page: number;
  limit: number;
}

export interface Search {
  search?: string;
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  status: string;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      // ... other user properties
    };
  }
}

export interface ValidationErrorResponse {
  field: string;
  message: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  status: 'success' | 'error' | 'fail';
  message: string;
  data: T | null;
}


type UserType = 'student' | 'professional' | 'admin';
type CourseCategory = 'digital_skills' | 'soft_skills' | 'exam_prep';
type EnrollmentStatus = 'active' | 'completed' | 'dropped';
type ProgressStatus = 'not_started' | 'in_progress' | 'completed';
type CertificateStatus = 'pending' | 'issued' | 'revoked';
