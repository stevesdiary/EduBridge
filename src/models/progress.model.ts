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
  paranoid: true,
  underscored: true
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
  userId!: string;

  @ForeignKey(() => Enrollment)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  courseEnrollmentId!: string;
  
  @ForeignKey(() => Lesson)
  @Column({
    type: DataType.UUID
  })
  lastCompletedLessonId?: string;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  })
  completionPercentage!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  lastAccessedAt!: Date;

  @Column({
    type: DataType.ENUM('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'),
    defaultValue: 'NOT_STARTED'
  })
  status!: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  totalLessonsCompleted!: number;

  @BelongsTo(() => User)
  user?: User;

  @BelongsTo(() => Enrollment)
  enrollment?: Enrollment;

  @BelongsTo(() => Lesson)
  lastCompletedLesson?: Lesson;
}
