import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

import { Loader } from '#Decorators';
import { User } from '#GlobalTypes';
import { UserModel } from '#Modules/User/models';
import { UserDataLoader } from '#Modules/User/dataloaders';

import { AdminModel } from './models';
import { Admin } from './Admin.entity';

@Resolver(() => AdminModel)
export class AdminRelationsResolver {
  @ResolveField(() => UserModel)
  user(
    @Parent() { userId }: Admin,
    @Loader(UserDataLoader)
    userLoader: DataLoader<number, User>,
  ): Promise<User> {
    return userLoader.load(userId);
  }
}
