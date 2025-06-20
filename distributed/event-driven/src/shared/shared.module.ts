import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EventBusService } from './events/event-bus.service';

@Module({
  providers: [EventBusService],
  exports: [EventBusService],
  imports: [PrismaModule],
})
export class SharedModule {}
