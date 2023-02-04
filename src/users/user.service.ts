import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
@Dependencies(getRepositoryToken(User))
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  private readonly users: User[] = [];

  createUser(user: User) {
    this.users.push(user);
  }

  findAll() {
    return this.usersRepository.find();
  }
}
