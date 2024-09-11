import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  SetMetadata,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../helpers";
import { TokenService } from "../service/token.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("No token found");
    }
    const token = authHeader.split(" ")[1];
    let user;
    try {
      user = await this.tokenService.verifyToken(token);
    } catch (e: any) {
      throw new UnauthorizedException(`Invalid token: ${e.message}`);
    }
    const hasRole = roles.every((role) => user?.roles.includes(role));
    request.user = user;
    if (!hasRole) {
      throw new ForbiddenException("You do not have the required role");
    }
    return true;
  }
}

export const ROLES_KEY = "roles";
export const HasRoles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
