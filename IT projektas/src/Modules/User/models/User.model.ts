import { ObjectType, Field, ID } from '@nestjs/graphql';

import { DateTime, Email, Phone } from '#GraphQL/Scalars';
import { Admin } from '#Modules/Admin/Admin.entity';
import { AdminModel } from '#Modules/Admin/models';
import { GroupReservation, Manager } from '#GlobalTypes';
import { GroupReservationModel } from '#Modules/GroupReservation/models';
import { ManagerModel } from '#Modules/Manager/models';

@ObjectType('User')
export class UserModel {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Email)
  email: string;

  @Field(() => Phone, { nullable: true })
  phone: string | null;

  @Field(() => DateTime)
  createdAt: Date;

  @Field(() => DateTime)
  updatedAt: Date;

  @Field(() => DateTime, { nullable: true })
  deletedAt: Date;

  @Field(() => AdminModel, { nullable: true })
  admin: Promise<Admin> | null;

  @Field(() => ManagerModel, { nullable: true })
  manager: Promise<Manager> | null;

  @Field(() => [GroupReservationModel])
  groupReservations: Promise<GroupReservation[]>;
}
