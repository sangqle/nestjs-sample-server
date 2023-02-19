import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';

export const CurrentUser = createParamDecorator((_, req): User => req.user);
