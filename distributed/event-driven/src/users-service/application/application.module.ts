import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateUserUseCase } from './use-cases/create-user-use-case';
import { LoginUseCase } from './use-cases/login-use-case';
import { SharedModule } from 'src/shared/shared.module';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  providers: [CreateUserUseCase, LoginUseCase],
  exports: [CreateUserUseCase, LoginUseCase],
  imports: [
    InfrastructureModule,
    SharedModule,
    ClientsModule.register([
      {
        name: 'RABITMQ_SERVICE',
      },
    ]),
  ],
})
export class ApplicationModule {}
