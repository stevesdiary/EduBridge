import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { Module } from '../models/module.model';

@Table({
  tableName: 'lessons',
  timestamps: true,
  paranoid: true
})
export class Lesson extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  content?: string;

  @ForeignKey(() => Module)
  @Column({
    type: DataType.STRING,
    defaultValue: true
  })
  module_id?: string;

  @Column({
    type: DataType.STRING
  })
  resource_url?: string;

  @Column({
    type: DataType.BOOLEAN
  })
  is_downloadable?: boolean;

  @BelongsTo(() => Module)
  modules: Module = new Module;
}
