import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './user.entity.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async findLatestUser() {
    const user = (
      await this.entityManager.find(User, {
        take: 1,
        order: { id: 'DESC' },
      })
    )?.at(0);

    return user;
  }

  createUser(user: Omit<User, 'id'>) {
    return this.entityManager.save(User, this.entityManager.create(User, user));
  }
}
