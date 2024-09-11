// src/auth/service/token.service.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "../db/entity/UserEntity";
import { Config, JwtConfig } from "../middleware/config.middleware";

@Injectable()
export class TokenService {
  private readonly jwtConfig: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get<Config>("config").jwt;
  }

  async generateAccessToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      { sub: user.id, roles: user.roles },
      {
        secret: this.jwtConfig.key,
        expiresIn: this.jwtConfig["access-token-expiration"],
      },
    );
  }

  private async generateRefreshToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.jwtConfig.key,
        expiresIn: this.jwtConfig["refresh-token-expiration"],
      },
    );
  }

  async generateTokenPair(user: User) {
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      secret: this.jwtConfig.key,
    });
  }
}
