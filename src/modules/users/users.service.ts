import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLogger } from 'src/common/logger/app.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly logger: AppLogger,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let user = new User();
    user.user_id = createUserDto.userId;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.phone_number = createUserDto.phoneNumber;
    user.password = createUserDto.password;
    user.updated_at = new Date().getTime();
    user.is_deleted = false;
    user = await this.userRepository.save(user);
    return user;
  }
  g;

  async createGoogleUser({ username, email, googleId }) {
    try {
      console.log({ username, email, googleId });
      let user = new User();
      user.username = username;
      user.email = email;
      user.phone_number = '';
      user.password = googleId;
      user.updated_at = new Date().getTime();
      user.is_deleted = false;
      user.google_id = googleId;
      user = await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.logger.error(error.message, error);
      throw new Error(error.message);
    }
  }

  async findUserByEmail(email): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findOneById(id): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByUsername(username) {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findByIdWithRoles(id): Promise<User> {
    return await this.userRepository.findByIdWithRoles(id);
  }

  async findAll({
    page = 1,
    limit = 10,
  }: { page?: number; limit?: number } = {}): Promise<[User[], number]> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return [users, total];
  }

  async findByGoogleId(id): Promise<User> {
    return null;
  }
}
