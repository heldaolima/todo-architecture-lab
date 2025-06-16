import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users-service/persistence/user-repository';
import { HashPasswordService } from '../services/hash-password';
import { TokenService } from '../services/token';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userReop: UserRepository,
    @Inject('HASH_SERVICE')
    private readonly hashService: HashPasswordService,
    @Inject('TOKEN_SERVICE')
    private readonly tokenService: TokenService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userReop.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatches = this.hashService.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException();
    }

    const access = await this.tokenService.signIn(user);
    return access;
  }
}
