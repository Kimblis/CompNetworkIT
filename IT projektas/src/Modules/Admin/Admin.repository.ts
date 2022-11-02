import { ApolloError } from 'apollo-server-core';
import { Repository } from 'typeorm';

import { CustomRepository } from '#TypeORM/Utils';
import { GraphQLErrorCodes } from '#GraphQL';

import { Admin } from './Admin.entity';

@CustomRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async getAdminByIdOrFail(id: number) {
    const admin = await this.findOne({ where: { id } });
    if (!admin) {
      throw new ApolloError('Admin does not exist', GraphQLErrorCodes.NOT_FOUND);
    }

    return admin;
  }
}
