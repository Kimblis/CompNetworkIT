import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { ManagerRepository } from './Manager.repository';

@Injectable()
export class ManagerService {
  constructor(private managerRepository: ManagerRepository) {}

  getManagerByIdOrFail(id: number) {
    return this.managerRepository.getManagerByIdOrFail(id);
  }

  getManagerByIds(ids: number[]) {
    return this.managerRepository.find({ where: { id: In(ids) } });
  }

  getManagerByUserIds(userIds: number[]) {
    return this.managerRepository.find({ where: { userId: In(userIds) } });
  }
}
