import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  HasMany,
  ForeignKey
} from 'sequelize-typescript';
import { Module } from '../models/module.model';
import { Enrollment } from './enrollment.model';
import { Reference } from 'yup';

export enum DifficultyLevel {
  beginner = 'beginner', 
  intermediate = 'inntermediate', 
  advanced = 'advanced', 
  professional = 'professional'
}

export enum CourseStatus {
  draft = 'draft',
  published = 'published',
  archived = 'archived'
}

export enum Category {
  soft_skill = 'soft_skill',
  curriculum = 'curriculum',
  digital_skill = 'digital_skill',
  exam_preparation = 'exam_preparation'
}

@Table({
  tableName: 'courses',
  timestamps: true,
  underscored: true,
  paranoid: true
})

export class Course extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description?: string;

  @Column({
    type: DataType.STRING
  })
  subject?: string;

  @Column({
    type: DataType.STRING
  })
  duration?: string; 

  @Column({
    type: DataType.STRING
  })
  resourceUrl?: string;
  
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  available_offline!: boolean;

  @Column({
    type: DataType.ENUM(...Object.values(Category))
  })
  category!: string;
  
  // @Column({
  //   type: DataType.ENUM(...Object.values(CourseStatus))
  // })
  // status!: string;

  // @Column({
  //   type: DataType.ENUM('beginner', 'advanced', 'professional')
  // })
  // difficulty_level!: string;


  @Column({
    type: DataType.INTEGER
  })
  rating?: number;

  @Column({
    type: DataType.STRING
  })
  instructor?: string;

  @HasMany(() => Module)
  modules: Module[] = [];

  @HasMany(() => Enrollment)
  enrollments?: Enrollment[];
}
