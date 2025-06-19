import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/users-service/application/use-cases/create-user-use-case";
import { CreateUserDTO } from "src/users-service/presentation/dtos/create-user-dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUC: CreateUserUseCase,
    ) {}

    @Post()
    async create(@Body() createUserDTO: CreateUserDTO) {
        return this.createUserUC.execute(createUserDTO);
    }
}