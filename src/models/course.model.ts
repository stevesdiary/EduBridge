import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  HasMany 
} from 'sequelize-typescript';
import { Module } from '../models/module.model';
import { CourseEnrollment } from './enrollment.model';

@Table({
  tableName: 'courses',
  timestamps: true,
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
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  available_offline?: boolean;

  @Column({
    type: DataType.ENUM('digital_skill', 'soft_skill', 'exam_prep')
  })
  category!: string;

  @Column({
    type: DataType.ENUM('beginner', 'advanced', 'professional')
  })
  difficulty_level!: string;

  @Column({
    type: DataType.INTEGER
  })
  rating?: number

  @HasMany(() => Module)
  modules: Module[] = [];

  @HasMany(() => CourseEnrollment)
  enrollments?: CourseEnrollment[];
}
