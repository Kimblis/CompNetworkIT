import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Group, User } from '#GlobalTypes';

@Entity('groupReservations')
export class GroupReservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @Column({ nullable: true })
  userId: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @ManyToOne('Group', 'groupReservations')
  @JoinColumn({ name: 'groupId' })
  group: Promise<Group>;

  @ManyToOne('User', 'groupReservations', { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<User> | null;
}
