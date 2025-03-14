import { Column, Table, Model, IsUUID, DataType, Default, PrimaryKey, AllowNull, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";
import { Course } from "./course.model";

export enum CertificateStatus {
  PENNDING = 'PENDING',
  ISSUED = 'ISSUED',
  REVOKED = 'REVOKED'
}
@Table({
  tableName: 'certificates',
  timestamps: true,
  paranoid: true
})
export class Certificate extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id?: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  course_id?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    defaultValue: false
  })
  user_id?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  issued_date?: Date

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

  @Column({
    type: DataType.ENUM(...Object.values(CertificateStatus)),
    // defaultValue: CertificateStatus.ISSUED
  })
  status!: string

  @BelongsTo(() => Course)
  course: Course = new Course;

  @BelongsTo(() => User)
  user?: User;
}
