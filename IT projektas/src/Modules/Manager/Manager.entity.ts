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

@Entity('managers')
export class Manager extends BaseEntity {
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

  @OneToOne('User', 'manager')
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;
}
