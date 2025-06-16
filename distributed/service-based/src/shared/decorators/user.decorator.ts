import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserPayload } from "../types/auth";

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext)  => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserPayload;
  }
);