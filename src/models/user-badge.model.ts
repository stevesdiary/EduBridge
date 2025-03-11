import { Column, Table, Model, IsUUID, DataType, Default, PrimaryKey, AllowNull, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";
import { Course } from './course.model';
import { Badge } from '../models/badge.model';


@Table({
  tableName: 'user-badges',
  timestamps: true,
  paranoid: true
})
export class Certificate extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  user_id!: string;

  @ForeignKey(() => Badge)
  @Column({
    type: DataType.UUID,
  })
  badge_id?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  earned_date?: Date

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  certificate_url?: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  date_added?: Date;

  @BelongsTo(() => Course)
  course: Course = new Course;

  @HasMany(() => Badge)
  badges: Badge = new Badge;
}
