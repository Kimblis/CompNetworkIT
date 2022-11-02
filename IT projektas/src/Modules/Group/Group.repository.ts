import { ApolloError } from 'apollo-server-core';
import { Brackets, EntityManager, Repository } from 'typeorm';
import moment from 'moment';

import { DateFilters, PaginationOptions } from '#GraphQL/Inputs';
import { GraphQLErrorCodes } from '#GraphQL';
import { CustomRepository } from '#TypeORM/Utils';
import { Admin, ReservationTypeEnum } from '#GlobalTypes';

import { Group } from './Group.entity';
import { CreateGroupData } from './types';
import { UpdateGroupDetails } from './inputs';

@CustomRepository(Group)
export class GroupRepository extends Repository<Group> {
  async getGroupByIdOrFail(id: number) {
    const group = await this.findOne({ where: { id } });
    if (!group) {
      throw new ApolloError('Group does not exist', GraphQLErrorCodes.NOT_FOUND);
    }

    return group;
  }

  getGroupsByDateRangeAndType(type: ReservationTypeEnum, paginationOptions: PaginationOptions, dateFilters: DateFilters) {
    const formattedStartDate = dateFilters?.startDate && moment(dateFilters.startDate).format('YYYY-MM-DD H:mm:ss').toString();
    const formattedEndDate = dateFilters?.endDate && moment(dateFilters.endDate).format('YYYY-MM-DD H:mm:ss').toString();

    const qb = this.createQueryBuilder('group').where('group.type = :type', { type });
    if (dateFilters) {
      qb.andWhere(
        new Brackets((qb2) => {
          qb2.where(`CAST(group.startDate as DATETIME) >= CAST("${formattedStartDate}" as DATETIME)`);
          qb2.andWhere(`CAST(group.endDate as DATETIME) <= CAST("${formattedEndDate}" as DATETIME)`);
        }),
      );
    }
    return qb
      .orderBy('group.startDate', 'ASC')
      .offset(paginationOptions?.offset)
      .limit(paginationOptions?.limit || 20)
      .getManyAndCount();
  }

  createNewGroup({ id: adminId }: Admin, data: CreateGroupData, entityManager?: EntityManager) {
    const group = this.create({ ...data, adminId });

    return entityManager ? entityManager.save(group) : this.save(group);
  }

  updateGroupDetails(group: Group, details: UpdateGroupDetails, entityManager?: EntityManager) {
    return entityManager ? entityManager.save(Group, { ...group, ...details }) : this.save({ ...group, ...details });
  }
}
