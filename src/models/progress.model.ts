// src/models/hospital.model.ts
import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  HasMany, 
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { CourseEnrollment } from '../models/enrollment.model'
import { User } from './user.model';
import { Lesson } from '../models/lesson.model'

@Table({
  tableName: 'progresses',
  timestamps: true,
  paranoid: true
})
export class Progress extends Model {
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
  user_id?: string;

  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  course_enrollment_id?: string;
  
  @Column({
    type: DataType.UUID
  })
  last_completed_lesson_id?: string;

  @Column({
    type: DataType.NUMBER
  })
  completion_percentage?: number;

  @Column({
    type: DataType.DATE
  })
  last_accessed_date?: Date

  @BelongsTo (()=> User )
  users?: User

  @BelongsTo(() => CourseEnrollment)
  enrollments?: CourseEnrollment[];

  @BelongsTo(() => Lesson)
  lastCompletedLesson: Lesson = new Lesson;
}