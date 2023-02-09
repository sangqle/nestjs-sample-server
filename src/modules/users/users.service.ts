import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let user = null;
    try {
      user = new User();
      user.user_id = createUserDto.userId;
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.phone_number = createUserDto.phoneNumber;
      user.password = createUserDto.password;
      user.updated_at = new Date().getTime();
      user.is_deleted = false;
      user = await this.usersRepository.save(user);
      console.log('user: ', user);
    } catch (error) {
      console.log(error);
      user = null;
    }
    return user;
  }

  async findOneById(id) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
