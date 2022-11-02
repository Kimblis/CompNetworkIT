import { EntityManager, Repository } from 'typeorm';
import { ApolloError } from 'apollo-server-core';

import { GraphQLErrorCodes } from '#GraphQL';
import { CustomRepository } from '#TypeORM/Utils';

import { User } from './User.entity';
import { CreateNewUserData, UpdateUserData } from './types';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async getUserByIdOrFail(id: number) {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new ApolloError('User does not exists', GraphQLErrorCodes.NOT_FOUND);
    }

    return user;
  }

  async getUserByEmailOrFail(email: string) {
    const user = await this.findOne({ where: { email } });
    if (!user) {
      throw new ApolloError('User does not exists', GraphQLErrorCodes.NOT_FOUND);
    }

    return user;
  }

  async getUserByPhoneOrFail(phone: string) {
    const user = await this.findOne({ where: { phone } });
    if (!user) {
      throw new ApolloError('User does not exists', GraphQLErrorCodes.NOT_FOUND);
    }

    return user;
  }

  updateUserData(currentUser: User, details: UpdateUserData, entityManager?: EntityManager) {
    return entityManager ? entityManager.save(User, { ...currentUser, ...details }) : this.save({ ...currentUser, ...details });
  }

  createNewUser(data: CreateNewUserData, entityManager?: EntityManager) {
    const userEntity = this.create(data);

    return entityManager ? entityManager.save(userEntity) : this.save(userEntity);
  }
}
