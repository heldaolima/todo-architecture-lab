import { Injectable } from '@nestjs/common';
import { User } from 'src/users-service/domain/entities/user.entitiy';
import { UserRepository } from 'src/users-service/persistence/user-repository';
import { CreateUserDTO } from 'src/users-service/presentation/dtos/create-user-dto';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[];
  private userCount = 0;

  public save(email: string, password: string) {
    const user = new User(
      this.userCount + 1,
      email,
      password,
      new Date(),
      new Date(),
    );

    return Promise.resolve(user);
  }

  public getById(id: number) {
    const user = this.users.find((u) => u.id === id) || null;
    return Promise.resolve(user);
  }

  public getByEmail(email: string) {
    const user = this.users.find((u) => u.email === email) || null;
    return Promise.resolve(user);
  }
}
