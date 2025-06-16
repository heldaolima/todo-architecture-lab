import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/shared/types/auth';
import { TokenService } from 'src/users-service/application/services/token';
import { User } from 'src/users-service/domain/entities/user.entitiy';

@Injectable()
export class JwtTokenService implements TokenService {

  constructor(private jwtService: JwtService) {}

  public async signIn(user: User) {
    const payload: UserPayload = { id: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
