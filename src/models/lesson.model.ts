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
  timestamps: true,
  underscored: true
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
    type: DataType.TEXT
  })
  content!: string;

  @ForeignKey(() => Module)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  module_id?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  duration?: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  date_added?: Date;
}
