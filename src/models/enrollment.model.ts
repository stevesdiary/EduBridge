// src/models/hospital.model.ts
import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  HasMany, 
  ForeignKey
} from 'sequelize-typescript';
import { Module } from '../models/module.model';
import { Progress } from '../models/progress.model';
import { User } from './user.model';
import { Course } from './course.model';

@Table({
  tableName: 'courses',
  timestamps: true,
  underscored: true,
  paranoid: true
})
export class Enrollment extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  userId?: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  courseId?: string;

  @Column({
    type: DataType.DATE
  })
  enrollmentDate?: Date;

  // @HasMany(() => Module)
  // modules?: Module[];

  // @HasMany(() => Progress)
  // progresses?: Progress[];
}