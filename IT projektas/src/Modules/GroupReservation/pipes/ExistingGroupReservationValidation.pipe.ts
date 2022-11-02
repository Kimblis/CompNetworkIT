import { Injectable, PipeTransform } from '@nestjs/common';

import { GroupReservationService } from '#Modules/GroupReservation';

@Injectable()
export class ExistingGroupReservationValidationPipe implements PipeTransform {
  constructor(private groupReservationService: GroupReservationService) {}

  transform(groupReservationId?: number) {
    return this.groupReservationService.getGroupReservationByIdOrFail(groupReservationId);
  }
}
