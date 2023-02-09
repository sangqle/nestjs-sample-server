import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { UsersService } from '../../users/users.service';
import { JWTPayload } from '../interfaces/jwtPayload.interface';

/** The AuthMiddleware is used to
 * (1) read the request header bearer token/user access token
 * (2) decrypt the access token to get the user object
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}
  async use(
    req: Request | any,
    res: Response | any,
    next: (error?: any) => void,
  ) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user;

    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      const payload = verify(accessToken, 'secret');
      console.log('payload: ', payload);
      const id = payload;
      user = await this.userService.findOneById({ id });
    } catch (error) {
      throw new ForbiddenException('Please register or sign in.');
    }

    if (user) {
      req.user = user;
    }
    next();
  }
}
