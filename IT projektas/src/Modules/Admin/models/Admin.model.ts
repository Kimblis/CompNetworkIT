import { ObjectType, Field, ID } from '@nestjs/graphql';

import { DateTime } from '#GraphQL/Scalars';
import { UserModel } from '#Modules/User/models';
import { User } from '#Modules/User/User.entity';

@ObjectType('Admin')
export class AdminModel {
  @Field(() => ID)
  id: number;

  @Field(() => DateTime)
  createdAt: Date;

  @Field(() => DateTime)
  updatedAt: Date;

  @Field(() => DateTime, { nullable: true })
  deletedAt: Date | null;

  @Field(() => UserModel)
  user: Promise<User>;
}
