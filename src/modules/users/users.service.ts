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

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.user_id = createUserDto.userId;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.phone_number = createUserDto.phoneNumber;
    user.password = createUserDto.password;
    user.updated_at = new Date().getTime();
    user.is_deleted = false;

    return this.usersRepository.save(user);
  }

  async findOneById(query) {
    const id = query.id;
    return this.users[id];
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
