import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { UserService } from '#Modules/User';

import { AdminRepository } from './Admin.repository';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository, private userService: UserService) {}

  getAdminByIdOrFail(id: number) {
    return this.adminRepository.getAdminByIdOrFail(id);
  }

  getAdminsByIds(ids: number[]) {
    return this.adminRepository.find({ where: { id: In(ids) } });
  }

  getAdminsByUserIds(userIds: number[]) {
    return this.adminRepository.find({ where: { userId: In(userIds) } });
  }
}
