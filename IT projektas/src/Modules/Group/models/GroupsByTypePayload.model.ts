import { ObjectType, Field, Int } from '@nestjs/graphql';

import { GroupModel } from './Group.model';

@ObjectType()
export class GroupsByTypePayload {
  @Field(() => [GroupModel])
  groups: GroupModel[];

  @Field(() => Int)
  count: number;
}
