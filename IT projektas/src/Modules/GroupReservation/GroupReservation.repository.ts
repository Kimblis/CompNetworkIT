import { ApolloError } from 'apollo-server-core';
import { EntityManager, In, Repository } from 'typeorm';
import moment from 'moment';

import { GraphQLErrorCodes } from '#GraphQL';
import { CustomRepository } from '#TypeORM/Utils';

import { GroupReservation } from './GroupReservation.entity';
import { CreateGroupReservationData } from './types';

@CustomRepository(GroupReservation)
export class GroupReservationRepository extends Repository<GroupReservation> {
  async getGroupReservationByIdOrFail(id: number) {
    const groupReservation = await this.findOne({ where: { id } });
    if (!groupReservation) {
      throw new ApolloError('Group reservation does not exist', GraphQLErrorCodes.NOT_FOUND);
    }

    return groupReservation;
  }

  getUpcomingReservations() {
    const formattedBenchmarkStartDate = moment().add(1, 'days').set('hours', 0).format('YYYY-MM-DD H:mm:ss').toString();
    const formattedBenchmarkEndDate = moment().add(2, 'days').set('hours', 0).format('YYYY-MM-DD H:mm:ss').toString();
    return this.createQueryBuilder('reservation')
      .leftJoin('reservation.group', 'group')
      .where(`reservation.status = 'UPCOMING'`)
      .andWhere('reservation.isNotified = false')
      .andWhere(
        `CAST(group.startDate as DATETIME) BETWEEN CAST("${formattedBenchmarkStartDate}" as DATETIME) AND CAST("${formattedBenchmarkEndDate}" as DATETIME)`,
      )
      .orderBy('group.startDate', 'ASC')
      .getMany();
  }

  getFinishedReservations() {
    const formattedCurrentDate = moment().format('YYYY-MM-DD H:mm:ss').toString();
    return this.createQueryBuilder('reservation')
      .leftJoin('reservation.group', 'group')
      .where(`reservation.status = 'UPCOMING'`)
      .andWhere(`CAST(group.endDate as DATETIME) <= CAST("${formattedCurrentDate}" as DATETIME)`)
      .orderBy('group.startDate', 'ASC')
      .getMany();
  }

  createNewGroupReservation(data: CreateGroupReservationData, entityManager?: EntityManager) {
    const groupReservation = this.create(data);

    return entityManager ? entityManager.save(groupReservation) : this.save(groupReservation);
  }
}
