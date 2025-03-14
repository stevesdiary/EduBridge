import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
import { Lesson } from '../models/lesson.model'; 
import { Certificate } from '../models/certificate.model';
import { Module } from '../models/module.model';
import { Enrollment } from '../models/enrollment.model';
import { Profile } from '../models/profile.model';
import { Progress } from '../models/progress.model';
import { Badge } from '../models/badge.model';
import { UserBadge } from '../models/user-badge.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'your_database',
  models: [User, Certificate, Lesson, Course, Module, Enrollment, Profile, Progress, Badge, UserBadge],
});

export default sequelize;
