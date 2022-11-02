export type User = import('#Modules/User').User;
export type GroupReservation = import('#Modules/GroupReservation').GroupReservation;
export type Admin = import('#Modules/Admin').Admin;
export type Manager = import('#Modules/Manager').Manager;
export type Group = import('#Modules/Group').Group;

export enum DayEnum {
  MONDAY = '1',
  TUESDAY = '2',
  WEDNESDAY = '3',
  THURSDAY = '4',
  FRIDAY = '5',
  SATURDAY = '6',
  SUNDAY = '7',
}

export enum ReservationTypeEnum {
  SIGHTSEEING = 'SIGHTSEEING',
  HOLIDAY = 'HOLIDAY',
  UNIVERSAL = 'UNIVERSAL',
}
