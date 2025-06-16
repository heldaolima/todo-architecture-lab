import { Module } from "@nestjs/common";
import { BcryptHashService } from "./crypto/bcrypt-hash-service";
import { PrismaUserRepository } from "./database/prisma-user-repository";
import { JwtTokenService } from "./token/jwt-token-service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/shared/prisma/prisma.module";

@Module({
    providers: [
        {
            provide: 'HASH_SERVICE',
            useClass: BcryptHashService,
        },
        {
            provide: 'TOKEN_SERVICE',
            useClass: JwtTokenService,
        },
        {
            provide: 'USER_REPOSITORY',
            useClass: PrismaUserRepository,
        }
    ],
    exports: ['HASH_SERVICE', 'TOKEN_SERVICE', 'USER_REPOSITORY'],
    imports: [
        PrismaModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '10h' },
        })
    ]
})
export class InfrastructureModule {}