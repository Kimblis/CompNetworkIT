import { ApolloError } from 'apollo-server-core';
import { Repository } from 'typeorm';

import { CustomRepository } from '#TypeORM/Utils';
import { GraphQLErrorCodes } from '#GraphQL';

import { Manager } from './Manager.entity';

@CustomRepository(Manager)
export class ManagerRepository extends Repository<Manager> {
  async getManagerByIdOrFail(id: number) {
    const manager = await this.findOne({ where: { id } });
    if (!manager) {
      throw new ApolloError('Manager does not exist', GraphQLErrorCodes.NOT_FOUND);
    }

    return manager;
  }
}
