// src/models/hospital.model.ts
import { 
  Table, 
  Column, 
  Model, 
  DataType,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { Enrollment } from '../models/enrollment.model'
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
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  user_i!: string;

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
    type: DataType.DATE,
    allowNull: false
  })
  last_accessed_at?: Date

  @BelongsTo (()=> User )
  users?: User

  // @BelongsTo(() => Enrollment)
  // enrollments?: Enrollment[];
}