import { registerEnumType } from '@nestjs/graphql';

import { ReservationTypeEnum } from '#GlobalTypes';

export const registerGraphqlEnums = () => {
  registerEnumType(ReservationTypeEnum, {
    name: 'ReservationTypeEnum',
    description: 'Represents reservation type',
  });

  return;
};
