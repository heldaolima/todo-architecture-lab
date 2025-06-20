import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ApiGatewayModule],
})
export class AppModule {}
