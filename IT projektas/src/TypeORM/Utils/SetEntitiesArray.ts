import { CustomEntityManager } from '#TypeORM/types';

export const setEntitiesArrays = (manager: CustomEntityManager) => {
  const entities = {
    adminsBeforeUpdate: [],
    adminsInserted: [],
    adminsRemoved: [],
    adminsLeft: [],
    adminsRejected: [],
    adminsApproved: [],
    partnersBeforeUpdate: [],
    partnersInserted: [],
    partnersRemoved: [],
    partnersLeft: [],
    partnersRejected: [],
    partnersApproved: [],
    reservationsBeforeUpdate: [],
    reservationsInserted: [],
    reservationsApproved: [],
    reservationsRejected: [],
    reservationsCancelled: [],
    reservationsChanged: [],
    businessesBeforeUpdate: [],
    servicesBeforeUpdate: [],
    usersBeforeUpdate: [],
    groupsBeforeUpdate: [],
    workHoursInserted: [],
    workHoursRemoved: [],
    userLunchBreaksInserted: [],
    personalTimesBeforeUpdate: [],
    imagesRemoved: [],
    imagesBeforeUpdate: [],
  };
  if (!manager.entities) {
    Object.assign(manager, { entities });
  }
};
