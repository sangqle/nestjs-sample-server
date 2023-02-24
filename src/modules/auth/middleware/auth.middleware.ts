import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { AppLogger } from 'src/common/logger/app.logger';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.interface';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from '../../users/users.service';

/** The AuthMiddleware is used to
 * (1) read the request header bearer token/user access token
 * (2) decrypt the access token to get the user object
 */

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UsersService,
    private readonly logger: AppLogger,
    private readonly configService: ConfigService,
  ) {}
  async use(
    req: AuthenticatedRequest | any,
    res: Response | any,
    next: (error?: any) => void,
  ) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];

    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      const payload = verify(
        accessToken,
        this.configService.get<string>('JWT_SECRET'),
      );
      const id = payload.sub;
      const user: User = await this.userService.findByIdWithRoles(id);
      if (!user) {
        throw new ForbiddenException('Invalid toke, maybe user is disable');
      }
      req.userInfo = user;
    } catch (error) {
      this.logger.error(error);
      throw new ForbiddenException(error.message);
    }
    next();
  }
}
