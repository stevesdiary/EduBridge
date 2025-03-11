import { Column, Table, Model, IsUUID, DataType, Default, PrimaryKey, AllowNull, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";


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
}
