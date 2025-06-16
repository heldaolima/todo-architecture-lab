import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginUseCase } from "src/users-service/application/use-cases/login-use-case";
import { LoginDTO } from "src/users-service/presentation/dtos/login-dto";

@Controller('auth')
export class AuthController {
  constructor(private loginUC: LoginUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDTO) {
    return this.loginUC.execute(loginDto.email, loginDto.password)
  }

}