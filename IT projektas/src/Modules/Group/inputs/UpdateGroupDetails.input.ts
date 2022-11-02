import { Field, InputType, Int } from '@nestjs/graphql';

import { UpdateDateFilters } from '#GraphQL/Inputs';

@InputType()
export class UpdateGroupDetails extends UpdateDateFilters {
  @Field(() => Int, { nullable: true })
  price?: number | null;

  @Field(() => Int, { nullable: true })
  groupSize?: number | null;

  @Field(() => String)
  destination: string;

  @Field(() => String, { nullable: true })
  description: string | null;
}
