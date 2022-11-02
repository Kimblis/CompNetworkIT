import { Injectable, PipeTransform } from '@nestjs/common';

import { ManagerService } from '#Modules/Manager';

@Injectable()
export class ExistingManagerValidationPipe implements PipeTransform {
  constructor(private managerService: ManagerService) {}

  transform(managerId?: number) {
    return this.managerService.getManagerByIdOrFail(managerId);
  }
}
