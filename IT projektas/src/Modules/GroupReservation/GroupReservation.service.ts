import { Injectable } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';

import { Group } from '#GlobalTypes';

import { GroupReservationRepository } from './GroupReservation.repository';
import { GroupReservation } from './GroupReservation.entity';

@Injectable()
export class GroupReservationService {
  constructor(private groupReservationRepository: GroupReservationRepository) {}

  getUpcomingReservations() {
    return this.groupReservationRepository.getUpcomingReservations();
  }

  getFinishedReservations() {
    return this.groupReservationRepository.getFinishedReservations();
  }

  getGroupReservationByIdOrFail(id: number) {
    return this.groupReservationRepository.getGroupReservationByIdOrFail(id);
  }

  getGroupReservations(groupId: number) {
    return this.groupReservationRepository.find({ where: { groupId } });
  }

  getUserReservations(userId: number) {
    return this.groupReservationRepository.find({ where: { userId } });
  }

  getGroupReservationsByIds(ids: number[]) {
    return this.groupReservationRepository.find({ where: { id: In(ids) } });
  }

  getGroupReservationsByIdsWithDeleted(ids: number[]) {
    return this.groupReservationRepository.find({ where: { id: In(ids) }, withDeleted: true });
  }

  getGroupReservationsByUserIds(userIds: number[]) {
    return this.groupReservationRepository.find({ where: { userId: In(userIds) } });
  }

  getGroupReservationsByGroupIds(groupIds: number[]) {
    return this.groupReservationRepository.find({ where: { groupId: In(groupIds) } });
  }

  deleteGroupReservations(groupId: number, entityManager?: EntityManager) {
    return entityManager
      ? entityManager.softRemove(GroupReservation, { groupId })
      : this.groupReservationRepository.softRemove({ groupId });
  }

  cancelUserReservations(userId: number, entityManager?: EntityManager) {
    return entityManager
      ? entityManager.softRemove(GroupReservation, { userId })
      : this.groupReservationRepository.softRemove({ userId });
  }

  cancelReservation(reservation: GroupReservation) {
    return reservation.softRemove();
  }

  createGroupReservations(group: Group, clientId: number, entityManager?: EntityManager) {
    return this.groupReservationRepository.createNewGroupReservation({ userId: clientId, groupId: group.id }, entityManager);
  }
}
