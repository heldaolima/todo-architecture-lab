import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserRepository } from 'src/users-service/persistence/user-repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public save(email: string, password: string) {
    return this.prisma.user.create({
      data: {
        email,
        password
      },
    });
  }

  public getById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  public getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }
}
