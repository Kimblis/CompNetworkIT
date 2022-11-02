import { Injectable, PipeTransform } from '@nestjs/common';

import { GroupService } from '#Modules/Group';

@Injectable()
export class ExistingGroupValidationPipe implements PipeTransform {
  constructor(private groupService: GroupService) {}

  transform(groupId?: number) {
    return this.groupService.getGroupByIdOrFail(groupId);
  }
}
