import { Module } from "@nestjs/common";
import { InMemoryTaskRepository } from "./in-memory-task-repository";

@Module({
    providers: [
        {
            provide: 'TASK_REPOSITORY',
            useClass: InMemoryTaskRepository
        }
    ],
    exports: ['TASK_REPOSITORY']
})
export class DatabaseModule {}