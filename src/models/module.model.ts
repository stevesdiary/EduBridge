import { Column, Table, Model, IsUUID, DataType, Default, PrimaryKey, AllowNull, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Course } from "./course.model";
import { Lesson } from './lesson.model';
import { ModuleAttributes, ModuleCreationAttributes } from '../types/module.type';

@Table({
  tableName: 'modules',
  timestamps: true,
  paranoid: true,
  underscored: true
})
export class Module extends Model<ModuleAttributes, ModuleCreationAttributes>  {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  courseId!: string;

  @Column({
    type: DataType.STRING,
    defaultValue: false
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description?: string

  @Column({
    type: DataType.STRING
  })
  duration?: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  date_added?: Date;

  @BelongsTo(() => Course)
  courses: Course = new Course;

  @HasMany(() => Lesson)
  lessons?: Lesson[];
}
