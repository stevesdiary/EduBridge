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
  timestamps: true
})
export class Profile extends Model {
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
  first_name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  last_name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  phone?: string;

  @Column({
    type: DataType.ARRAY
  })
  professional_interests?: string[];

  // @Column({
  //   type: DataType.STRING,
  //   defaultValue: 'user'
  // })
  // role?: string;

  @Column({
    type: DataType.STRING,
  })
  location?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  user_id?: string;

  @BelongsTo(() => User)
  users?: User;
}
