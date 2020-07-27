import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService} from 'src/user';
import { IJwtPayload } from './jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  createToken(user: User): string {
    const payload: IJwtPayload = { uid: user.id };
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: IJwtPayload): Promise<User | undefined> {
    return await this.userService.getUserFromJwtPayload(payload);
  }
}
