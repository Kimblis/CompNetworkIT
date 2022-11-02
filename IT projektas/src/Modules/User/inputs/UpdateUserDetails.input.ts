import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

import { Phone } from '#GraphQL/Scalars';
import { InputLimits } from '#Utils';

@InputType()
export class UpdateUserDetails {
  @Field({ nullable: true })
  @MaxLength(InputLimits.NAME.MAX)
  @MinLength(InputLimits.NAME.MIN)
  @IsOptional()
  name?: string | null;

  @Field(() => Phone, { nullable: true })
  @MaxLength(InputLimits.PHONE.MAX)
  @MinLength(InputLimits.PHONE.MIN)
  @IsOptional()
  phone?: string | null;
}
