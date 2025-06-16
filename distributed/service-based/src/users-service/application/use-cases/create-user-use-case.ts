import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { HashPasswordService } from "../services/hash-password";
import { CreateUserDTO } from "src/users-service/presentation/dtos/create-user-dto";
import validator from "validator";
import { UserRepository } from "src/users-service/persistence/user-repository";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('HASH_SERVICE')
        private readonly hashService: HashPasswordService,
        @Inject('USER_REPOSITORY')
        private readonly repo: UserRepository,
    ){}

    public async execute(dto: CreateUserDTO) {
        let { email, password } = dto;

        if (!email) {
            throw new BadRequestException('Email must not be empty');
        }

        if (!validator.isEmail(email)) {
            throw new BadRequestException('Email must be in a valid email format')
        }

        if (!password) {
            throw new BadRequestException('Password must no be empty')
        }

        if (password.length < 6) {
            throw new BadRequestException('Password must be at least 6 characters long')
        }

        password = await this.hashService.hash(password);
        
        return this.repo.save(email, password);
    }
}