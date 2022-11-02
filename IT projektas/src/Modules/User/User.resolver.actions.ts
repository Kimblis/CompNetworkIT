import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserContext } from '#Decorators';
import { AuthGuard } from '#Guards';
import { ArgsValidationPipe, UpdateValidationPipe } from '#Pipes';

import { UserService } from './User.service';
import { MyUserGuard } from './guards';
import { UserModel } from './models';
import { User } from './User.entity';
import { UpdateUserDetails } from './inputs';

@Resolver()
export class UserActionsResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(MyUserGuard)
  @Query(() => UserModel, { nullable: true })
  myUser(@UserContext() user: User) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserModel)
  updateUser(
    @UserContext() user: User,
    @Args('details', { type: () => UpdateUserDetails, nullable: true }, UpdateValidationPipe, ArgsValidationPipe)
    details: UpdateUserDetails | null,
  ) {
    return this.userService.updateUser(user, details);
  }
}
