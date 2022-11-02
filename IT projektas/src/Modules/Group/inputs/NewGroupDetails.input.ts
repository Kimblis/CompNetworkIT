import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, MaxLength, Min, MinLength } from 'class-validator';

import { DateFilters } from '#GraphQL/Inputs';
import { InputLimits } from '#Utils/InputLimits';
import { ReservationTypeEnum } from '#GlobalTypes';

@InputType()
export class NewGroupDetails extends DateFilters {
  @Field(() => Int)
  price: number;

  @Field(() => ReservationTypeEnum)
  type: ReservationTypeEnum;

  @Min(InputLimits.GROUP_SIZE.MIN)
  @Field(() => Int)
  groupSize: number;

  @Field(() => String)
  destination: string;

  @Field(() => String, { nullable: true })
  @MaxLength(InputLimits.NOTE.MAX)
  @MinLength(InputLimits.NOTE.MIN)
  @IsOptional()
  description: string | null;
}
