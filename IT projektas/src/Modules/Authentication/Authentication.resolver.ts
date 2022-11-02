import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Email, Phone } from '#GraphQL/Scalars';
import { User } from '#GlobalTypes';
import { UserContext } from '#Decorators';

import { AuthenticationService } from './Authentication.service';
import { LoginPayload } from './models';
import { LoginGuard, RegisterGuard } from './guards';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(RegisterGuard)
  @Mutation(() => LoginPayload)
  register(
    @Args('name', { type: () => String }) name: string,
    @Args('email', { type: () => Email }) email: string,
    @Args('password', { type: () => String }) password: string,
    @Args('phone', { type: () => Phone, nullable: true }) phone?: string | null,
  ) {
    return this.authenticationService.register({ name, email, password, phone });
  }

  @UseGuards(LoginGuard)
  @Mutation(() => LoginPayload)
  login(
    @Args('email', { type: () => Email }) email: string,
    @Args('password', { type: () => String }) password: string,
    @UserContext() user: User,
  ) {
    return this.authenticationService.loginWithPassword(user);
  }
}
