import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";
import { CreateUserUseCase } from "./use-cases/create-user-use-case";
import { LoginUseCase } from "./use-cases/login-use-case";

@Module({
    providers: [CreateUserUseCase, LoginUseCase],
    exports: [CreateUserUseCase, LoginUseCase],
    imports: [InfrastructureModule]
})
export class ApplicationModule {}