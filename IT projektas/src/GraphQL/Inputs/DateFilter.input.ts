import { Field, InputType } from '@nestjs/graphql';

import { DateTime } from '#GraphQL/Scalars';

@InputType()
export class DateFilters {
  @Field(() => DateTime)
  startDate: Date;

  @Field(() => DateTime)
  endDate: Date;
}
