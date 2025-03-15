import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  ForeignKey, 
  BelongsTo
} from 'sequelize-typescript';
import { User } from './user.model';



@Table({
  tableName: 'profiles',
  timestamps: true,
  underscored: true
})
export class Profile extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id?: string;

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false
  // })
  // last_name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  phone?: string;

  // @Column({
  //   type: DataType.STRING
  // })
  // professional_interests?: string;

  @Column({
    type: DataType.DATE
  })
  date_of_birth?: Date;

  @Column({
    type: DataType.STRING,
  })
  location?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  is_active!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  user_id?: string;

  @BelongsTo(() => User)
  users?: User;
}
