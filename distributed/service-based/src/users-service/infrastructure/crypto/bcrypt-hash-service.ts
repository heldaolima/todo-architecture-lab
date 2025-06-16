import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";
import { HashPasswordService } from "src/users-service/application/services/hash-password";

@Injectable()
export class BcryptHashService implements HashPasswordService {
    public hash(password: string) {
        return bcrypt.hash(password, 10)
    }

    public compare(plain: string, hashed: string) {
        return bcrypt.compare(plain, hashed);
    }
}
