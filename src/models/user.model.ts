import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  HasMany,
  HasOne
} from 'sequelize-typescript';
import { Enrollment } from './enrollment.model';
import { Progress } from './progress.model';
import { Certificate } from './certificate.model'
import { Profile } from './profile.model';
import { UserBadge } from './user-badge.model';

export enum Role {
  STUDENT = 'Student',
  ADMIN = 'Admin',
  INSTRUCTOR = 'Instructor',
  TEACHER = 'Teacher'
}

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
  paranoid: true
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
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: Role.STUDENT
  })
  role?: Role;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  verified?: boolean;

  @HasOne(() => Profile)
  profile?: Profile;

  @HasMany(() => Enrollment)
  enrollments: Enrollment[] = [];

  @HasMany(() => Progress)
  progresses?: Progress[] = [];

  @HasMany(() => UserBadge)
  userBadges?: UserBadge[];

  @HasMany(() => Certificate)
  certificates?: Certificate[];
}
