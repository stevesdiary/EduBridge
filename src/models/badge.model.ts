import { Column, Table, Model, IsUUID, DataType, Default, PrimaryKey, AllowNull, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";
import { UserBadge } from "./user-badge.model";


@Table({
  tableName: 'badges',
  timestamps: true,
  paranoid: true
})
export class Badge extends Model {
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
  name!: string;

  @ForeignKey(() => UserBadge)
  @Column({
    type: DataType.UUID
  })
  user_badge_id?: string;
  
  @Column({
    type: DataType.UUID,
    defaultValue: false
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  icon_url?: string;

  @HasMany(() => UserBadge)
  user_badges?: UserBadge; 
}
