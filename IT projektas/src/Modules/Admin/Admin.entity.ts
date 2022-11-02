import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';

import { User } from '#GlobalTypes';

@Entity('admins')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToOne('User', 'admin')
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;
}
