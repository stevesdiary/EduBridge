import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  PrimaryKey, 
  Default,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Course } from './course.model';
import { Module } from './module.model';

@Table({
  tableName: 'lessons',
  timestamps: true
})
export class Lesson extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
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
  content!: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  course_id!: string;

  @ForeignKey(() => Module)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  module_id?: string;

  @BelongsTo(() => Course)
  course?: Course;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  duration?: number;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  date_added?: Date;
}
