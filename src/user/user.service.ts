import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';
import { AuthService, IJwtPayload } from 'src/auth';
import { User } from './user.entity';
import { LoginInput } from './login.input';
import { RegisterInput } from './register.input';
import { TokenPayload } from './token.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async createUser(
    input: RegisterInput,
  ): Promise<TokenPayload> {
    let user = new User();
    user.name = input.name;
    user.password = input.password;
    user.role = input.role;
    user = await this.userRepository.save(user);
    const token = this.authService.createToken(user);
    return new TokenPayload(token);
  }

  public async login(loginInput: LoginInput): Promise<TokenPayload> {
    const user = await this.authenticateLogin(loginInput);
    const token = this.authService.createToken(user);
    return new TokenPayload(token);
  }

  private async authenticateLogin(
    loginInput: Partial<LoginInput>,
  ): Promise<User> {
    const { name, password } = loginInput;
    const user = await this.getOneByName(name);

    if (!user) {
      throw new UnauthorizedException('This user does not exist');
    }
    const passwordValid = password === user.password;
    // const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    return user;
  }

  public async getUserFromJwtPayload(
    payload: IJwtPayload,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne({
      id: payload.uid,
    });
  }

  public async getOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }

  public async getOneByName(name: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {name: name},
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
