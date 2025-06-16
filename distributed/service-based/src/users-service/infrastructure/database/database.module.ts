import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './prisma-user-repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: PrismaUserRepository,
    },
  ],
  exports: ['USER_REPOSITORY'],
  imports: [PrismaModule],
})
export class DatabaseModule {}
