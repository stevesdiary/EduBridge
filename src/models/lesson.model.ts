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
import { Course } from './course.model';
import { Module } from './module.model';

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

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  duration?: string;

  @Column({
    type: DataType.STRING
  })
  resourceUrl!: string;

  // @Column(DataType.DATE)
  // dateAdded?: Date;
}
