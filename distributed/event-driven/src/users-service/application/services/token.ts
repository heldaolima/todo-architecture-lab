import { User } from "src/users-service/domain/entities/user.entitiy";

export class TokenService {
  signIn: (user: User) => Promise<{ access_token: string }>;
}