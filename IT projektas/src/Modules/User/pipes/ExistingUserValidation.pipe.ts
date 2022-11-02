import { Injectable, PipeTransform } from '@nestjs/common';

import { UserService } from '#Modules/User';

@Injectable()
export class ExistingUserValidationPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  transform(userId?: number) {
    return this.userService.findUserByIdOrFail(userId);
  }
}
