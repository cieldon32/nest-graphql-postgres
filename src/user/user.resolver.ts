
import { Args, Mutation, Resolver , Query} from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { LoginInput } from './login.input';
import { RegisterInput } from './register.input';
import { TokenPayload } from './token.dto';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query(() => String)
  public hello(): string {
    return 'hello'
  }

  @Query(() => User)
  public async findUserById(@Args('id') id: string,): Promise<User> {
    return this.userService.getOneById(id);
  }

  @Query(() => [User])
  public async findAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Mutation(() => TokenPayload)
  public login(
    @Args('loginInput') input: LoginInput,
  ): Promise<TokenPayload> {
    return this.userService.login(input);
  }

  @Mutation(() => TokenPayload)
  public register(
    @Args('registerInput') input: RegisterInput,
  ): Promise<TokenPayload> {
    return this.userService.createUser(input);
  }

}
