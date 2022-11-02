import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

import { Loader } from '#Decorators';
import { User } from '#GlobalTypes';
import { UserModel } from '#Modules/User/models';
import { UserDataLoader } from '#Modules/User/dataloaders';

import { ManagerModel } from './models';
import { Manager } from './Manager.entity';

@Resolver(() => ManagerModel)
export class ManagerRelationsResolver {
  @ResolveField(() => UserModel)
  user(
    @Parent() { userId }: Manager,
    @Loader(UserDataLoader)
    userLoader: DataLoader<number, User>,
  ): Promise<User> {
    return userLoader.load(userId);
  }
}
