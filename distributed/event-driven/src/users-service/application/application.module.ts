import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateUserUseCase } from './use-cases/create-user-use-case';
import { LoginUseCase } from './use-cases/login-use-case';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  providers: [CreateUserUseCase, LoginUseCase],
  exports: [CreateUserUseCase, LoginUseCase],
  imports: [InfrastructureModule, EventEmitterModule.forRoot()],
})
export class ApplicationModule {}
