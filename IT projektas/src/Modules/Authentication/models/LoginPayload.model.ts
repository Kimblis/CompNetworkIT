import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginPayload {
  @Field()
  accessToken: string;
}
