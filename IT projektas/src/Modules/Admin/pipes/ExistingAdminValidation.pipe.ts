import { Injectable, PipeTransform } from '@nestjs/common';

import { AdminService } from '#Modules/Admin';

@Injectable()
export class ExistingAdminValidationPipe implements PipeTransform {
  constructor(private adminService: AdminService) {}

  transform(adminId?: number) {
    return this.adminService.getAdminByIdOrFail(adminId);
  }
}
