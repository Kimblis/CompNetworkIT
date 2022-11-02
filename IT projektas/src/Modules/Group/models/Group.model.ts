import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

import { DateTime } from '#GraphQL/Scalars';
import { GroupReservationModel } from '#Modules/GroupReservation/models';
import { GroupReservation, Admin, ReservationTypeEnum } from '#GlobalTypes';
import { AdminModel } from '#Modules/Admin/models';

@ObjectType('Group')
export class GroupModel {
  @Field(() => ID)
  id: number;

  @Field(() => ReservationTypeEnum)
  type: ReservationTypeEnum;

  @Field(() => DateTime)
  startDate: Date;

  @Field(() => DateTime)
  endDate: Date;

  @Field()
  destination: string;

  @Field({ nullable: true })
  description: string | null;

  @Field(() => Int)
  groupSize: number;

  @Field(() => Int, { nullable: true })
  price: number | null;

  @Field(() => DateTime)
  createdAt: Date;

  @Field(() => DateTime)
  updatedAt: Date;

  @Field(() => AdminModel)
  admin: Promise<Admin>;

  @Field(() => [GroupReservationModel])
  groupReservations: Promise<GroupReservation[]>;
}
