import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException, applyDecorators, UseGuards
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TokenService } from "../service/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("No token found");
    }

    const token = authHeader.split(" ")[1];
    try {
      const user = await this.tokenService.verifyToken(token);
      request.user = user;
      console.log(user);
      return true;
    } catch (e: any) {
      throw new UnauthorizedException(`Invalid token: ${e.message}`);
    }
  }
}

export function Authorized() {
  return applyDecorators(UseGuards(AuthGuard));
}
