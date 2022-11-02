import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BaseEntity,
  OneToMany,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';

import { GroupReservation, Admin, Manager } from '#GlobalTypes';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string | null;

  @Column({ nullable: true })
  password: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @OneToOne('Admin', 'user', { nullable: true })
  admin: Promise<Admin> | null;

  @OneToOne('Manager', 'user', { nullable: true })
  manager: Promise<Manager> | null;

  @OneToMany('GroupReservation', 'user')
  groupReservations: Promise<GroupReservation[]>;
}
