import { ObjectType, Field, ID } from '@nestjs/graphql';

import { DateTime } from '#GraphQL/Scalars';
import { Group, User } from '#GlobalTypes';
import { GroupModel } from '#Modules/Group/models';
import { UserModel } from '#Modules/User/models';

@ObjectType('GroupReservation')
export class GroupReservationModel {
  @Field(() => ID)
  id: number;

  @Field(() => DateTime)
  createdAt: Date;

  @Field(() => DateTime)
  updatedAt: Date;

  @Field(() => DateTime, { nullable: true })
  deletedAt: Date | null;

  @Field(() => GroupModel)
  group: Promise<Group>;

  @Field(() => UserModel, { nullable: true })
  user: Promise<User> | null;
}
