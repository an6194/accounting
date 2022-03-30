import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EmployeeProfile } from '../employees/employee-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => EmployeeProfile, (employeeProfile) => employeeProfile.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  employeeProfile: EmployeeProfile;
}
