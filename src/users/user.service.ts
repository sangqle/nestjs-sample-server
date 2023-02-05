import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
@Dependencies(getRepositoryToken(User))
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async createUser(user: User) {
    try {
      return await this.usersRepository.save(user);
    } catch (err) {
      return err;
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneBy({ id });
    } catch (err) {
      return err;
    }
  }

  async update(oldUser: User, updated_values: User): Promise<User> {
    const updatedUser = oldUser;

    Object.keys(updated_values).forEach((key) => {
      updatedUser[key] = updated_values[key];
    });

    try {
      return await this.usersRepository.save(updatedUser);
    } catch (err) {
      return err;
    }
  }

  async delete(id: number) {
    try {
      return await this.usersRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
