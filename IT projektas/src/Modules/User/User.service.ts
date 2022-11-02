import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { UserRepository } from './User.repository';
import { User } from './User.entity';
import { CreateNewUserData, UpdateUserData } from './types';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findUserByIdOrFail(id: number) {
    return this.userRepository.getUserByIdOrFail(id);
  }

  findUserByEmailOrFail(email: string) {
    return this.userRepository.getUserByEmailOrFail(email);
  }

  findUserByPhoneOrFail(phone: string) {
    return this.userRepository.getUserByPhoneOrFail(phone);
  }

  findUsersByIds(ids: number[]) {
    return this.userRepository.find({ where: { id: In(ids) } });
  }

  findUserByPhone(phone: string) {
    return this.userRepository.findOne({
      where: { phone },
    });
  }

  findUsersByPhones(phones: string[]) {
    return this.userRepository.find({ where: { phone: In(phones) } });
  }

  findUsersByPhonesOrEmails(phones: string[], emails: string[]) {
    return this.userRepository.find({ where: [{ phone: In(phones) }, { email: In(emails) }] });
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findOrCreateNewUser({ email, ...data }: CreateNewUserData) {
    const user = await this.findUserByEmail(email);
    return user || this.createNewUser({ email, ...data });
  }

  createNewUser(data: CreateNewUserData) {
    return this.userRepository.createNewUser(data);
  }

  updateUser(currentUser: User, details: UpdateUserData) {
    return this.userRepository.updateUserData(currentUser, details);
  }
}
