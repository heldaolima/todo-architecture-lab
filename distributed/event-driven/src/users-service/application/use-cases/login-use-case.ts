import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users-service/persistence/user-repository';
import { HashPasswordService } from '../services/hash-password';
import { TokenService } from '../services/token';
import { EventBusService } from 'src/shared/events/event-bus.service';
import { LoginEvent } from 'src/events/login';
import { EventsTypes } from 'src/events/events-types';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userReop: UserRepository,
    @Inject('HASH_SERVICE')
    private readonly hashService: HashPasswordService,
    @Inject('TOKEN_SERVICE')
    private readonly tokenService: TokenService,
    private eventBus: EventBusService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userReop.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatches = await this.hashService.compare(
      password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException();
    }

    const access = await this.tokenService.signIn(user);

    const event = new LoginEvent(email, new Date());
    await this.eventBus.publish(EventsTypes.Login, event);

    return access;
  }
}
