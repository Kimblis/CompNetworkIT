import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

import { Admin, GroupReservation, ReservationTypeEnum } from '#GlobalTypes';

@Entity('groups')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adminId: number;

  @Column({ type: 'enum', enum: ReservationTypeEnum })
  type: ReservationTypeEnum;

  @Column({
    type: 'timestamp',
    precision: 3,
  })
  startDate: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
  })
  endDate: Date;

  @Column()
  destination: string;

  @Column({ nullable: true })
  description: string | null;

  @Column({ default: 1 })
  groupSize: number;

  @Column({ nullable: true })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @ManyToOne('Admin', 'groups')
  @JoinColumn({ name: 'adminId' })
  admin: Promise<Admin>;

  @OneToMany('GroupReservation', 'group')
  groupReservations: Promise<GroupReservation[]>;
}
