import { InsertEvent, EntityManager, UpdateEvent, RemoveEvent, TransactionCommitEvent } from 'typeorm';
import { RecoverEvent } from 'typeorm/subscriber/event/RecoverEvent';

export interface CustomEntityManager extends EntityManager {
  entities?: any;
}

export interface CustomInsertEvent<Entity> extends InsertEvent<Entity> {
  manager: CustomEntityManager;
}

export interface CustomRecoverEvent<Entity> extends RecoverEvent<Entity> {
  manager: CustomEntityManager;
}

export interface CustomUpdateEvent<Entity> extends UpdateEvent<Entity> {
  manager: CustomEntityManager;
}

export interface CustomRemoveEvent<Entity> extends RemoveEvent<Entity> {
  manager: CustomEntityManager;
}

export interface CustomTransactionCommitEvent extends TransactionCommitEvent {
  manager: CustomEntityManager;
}
