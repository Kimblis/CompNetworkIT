import { ReservationTypeEnum } from '#GlobalTypes';

export type CreateGroupData = {
  type: ReservationTypeEnum;
  startDate: Date;
  endDate: Date;
  price: number;
  groupSize: number;
  note?: string | null;
};
