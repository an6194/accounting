import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../auth/user.entity';

@Entity()
export class EmployeeProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phone: string;

  @Column()
  position: string;

  @Column()
  fullName: string;

  @OneToOne(() => User, (user) => user.employeeProfile, { onDelete: 'CASCADE' })
  user: User;
}
