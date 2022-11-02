import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class PaginationOptions {
  @Field(() => Int, { defaultValue: null })
  offset: number;

  @Max(50)
  @Min(1)
  @Field(() => Int, { defaultValue: 20 })
  limit: number;
}
