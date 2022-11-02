import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { DateFilters, PaginationOptions } from '#GraphQL/Inputs';
import { Admin, ReservationTypeEnum } from '#GlobalTypes';

import { GroupRepository } from './Group.repository';
import { Group } from './Group.entity';
import { NewGroupDetails, UpdateGroupDetails } from './inputs';

@Injectable()
export class GroupService {
  constructor(private groupRepository: GroupRepository) {}

  getGroupsByIds(ids: number[]) {
    return this.groupRepository.find({ where: { id: In(ids) } });
  }

  getGroupsByIdsWithDeleted(ids: number[]) {
    return this.groupRepository.find({ where: { id: In(ids) }, withDeleted: true });
  }

  getGroupByIdOrFail(id: number) {
    return this.groupRepository.getGroupByIdOrFail(id);
  }

  getGroupsByAdminIds(adminIds: number[]) {
    return this.groupRepository.find({ where: { adminId: In(adminIds) } });
  }

  async getGroupsByDateRangeAndType(type: ReservationTypeEnum, paginationOptions: PaginationOptions, dateFilters: DateFilters) {
    const [groups, count] = await this.groupRepository.getGroupsByDateRangeAndType(type, paginationOptions, dateFilters);
    return { groups, count };
  }

  createNewGroup(data: NewGroupDetails, admin: Admin) {
    return this.groupRepository.createNewGroup(admin, data);
  }

  updateGroupDetails(group: Group, updateDetails: UpdateGroupDetails) {
    return this.groupRepository.updateGroupDetails(group, updateDetails);
  }

  async deleteGroup(group: Group) {
    await this.groupRepository.softRemove(group);

    return true;
  }
}
