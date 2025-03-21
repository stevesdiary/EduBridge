import * as yup from 'yup';
import { DifficultyLevel, CourseStatus } from '../models/course.model';

export const userRegistrationSchema = yup.object().shape({
  first_name: yup
    .string()
    .trim()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters'),

  last_name: yup
    .string()
    .trim()
    .optional()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters'),

  username: yup
    .string()
    .trim()
    .optional()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters'),
  
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email format'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character'
    ),
  
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
});

export const idSchema = yup.string().uuid().required('Id is required');

export const userUpdateSchema = yup.object().shape({
  // name: yup.string().optional(),
  // email: yup.string().email('Invalid email format').optional(),
  password: yup.string().trim()
  .min(6, 'Password must be at least 6 characters')
  .optional(),
  confirm_password: yup.string()
  .min(6, 'Password must be at least 6 characters')
  .oneOf([yup.ref('password')], 'Passwords must match')

});

export const passwordResetSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email format'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character'
    ),
  
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const userVerificationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email format'),
  
  code: yup
    .string()
    .trim()
    .required('Verification code is required')
    .length(6, 'Verification code must be 6 digits')
});

export const emailSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required')
});

export const courseCreationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  // difficulty_level: yup.string().required('Difficulty level is required').oneOf(Object.values(DifficultyLevel)),
  available_offline: yup.boolean().optional(),
  instructor: yup.string().optional()
});

export const courseUpdateSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  difficulty_level: yup.string().required('Difficulty level is required'),
  available_offline: yup.boolean().optional(),
  instructor: yup.string().optional()
});

export const courseStatusSchema = yup.object().shape({
  status: yup.string().required('status is required').oneOf(Object.values(CourseStatus))
})

export const searchSchema = yup.object({
  page: yup.number().min(1).default(1),
  limit: yup.number().min(1).max(100).default(10),
  search: yup.string().optional()
});

export const doctorRegistrationSchema = yup.object().shape({
  first_name: yup.string()
    .min(3, 'First name must be at least 3 characters')
    .required('First name is required'),
  last_name: yup.string()
    .min(3, 'Last name must be at least 3 characters')
    .required('Last name is required'),
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup.string().optional(),
  specialty: yup.string()
    .required('Specialty is required'),
  hospital_email: yup.string()
    .required('Hospital email is required'),
});
export const doctorUpdateSchema = yup.object().shape({
  first_name: yup.string()
    .min(3, 'First name must be at least 3 characters')
    .required('First name is required'),
  last_name: yup.string()
    .min(3, 'Last name must be at least 3 characters')
    .required('Last name is required'),
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup.string().optional(),
  specialty: yup.string()
    .required('Specialty is required'),
  hospital_email: yup.string()
    .required('Hospital email is required'),
});

export const createEnrollmentSchema = yup.object().shape({
  userId: yup.string().uuid().required(),
  courseId: yup.string().uuid().required(),
  startDate: yup.date().default(() => new Date()),
  status: yup.string().oneOf(['ENROLLED', 'COMPLETED', 'WITHDRAWN']).default('ENROLLED')
});

export const updateEnrollmentSchema = yup.object().shape({
  status: yup.string().oneOf(['ENROLLED', 'COMPLETED', 'WITHDRAWN']),
  completionDate: yup.date(),
  progress: yup.number().min(0).max(100)
});

export const lessonCreationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string(),
  moduleId: yup.string(),
  courseId: yup.string(),
  instructor: yup.string()
});
