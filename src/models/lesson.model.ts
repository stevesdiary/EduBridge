import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  PrimaryKey, 
  Default,
  ForeignKey,
  BelongsTo,
  IsUUID
} from 'sequelize-typescript';
// import { Category, Course } from './course.model';
import { Module } from './module.model';
import { Course } from './course.model';

export enum Category {
  soft_skill = 'soft_skill',
  primary = 'primary',
  secondary = 'secondary',
  exam_preparation = 'exam_preparation'
}

@Table({
  tableName: 'lessons',
  timestamps: true,
  underscored: true
})
export class Lesson extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.TEXT
  })
  content!: string;

  @ForeignKey(() => Module)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  moduleId!: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  courseId!: string;

  @Column({
    type: DataType.ENUM(...Object.values(Category)),
    allowNull: false
  })
  category?: string;

  @Column({
    type: DataType.STRING
  })
  resourceUrl?: string;
  description!: string;
  // courseId!: string;
  instructor?: string;
}
