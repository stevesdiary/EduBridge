import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  HasMany,
  HasOne
} from 'sequelize-typescript';
import { CourseEnrollment } from './enrollment.model';
import { Progress } from './progress.model';
import { Certificate } from './certificate.model'
import { Profile } from './profile.model';

export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  PROFESSIONAL = 'PROFESSIONAL',
  MODERATOR = 'MODERATOR'
}

@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model {
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
    unique: true,
    allowNull: false
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    unique: true
  })
  username?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password?: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.STUDENT
  })
  role?: UserRole;

  @Column({
    type: DataType.STRING
  })
  phone?: string;

  @Column({
    type: DataType.DATE
  })
  date_of_birth?: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  verified?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  is_active?: boolean;

  @HasOne(() => Profile)
  profile?: Profile;

  @HasMany(() => CourseEnrollment)
  courseEnrollments: CourseEnrollment[] = [];

  @HasMany(() => Progress)
  progresses?: Progress[] = [];

  @HasMany(() => Certificate)
  certificates: Certificate[] = [];
}
