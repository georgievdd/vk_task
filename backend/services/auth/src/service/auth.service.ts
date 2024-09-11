import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../db/entity/UserEntity";
import { Repository } from "typeorm";
import { TokenService } from "./token.service";
import { Credentials } from "../model/dto/credentials";
import * as bcrypt from "bcrypt";
import { TokenPair } from "../model/dto/token.pair";
import { UserRole } from "../helpers";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    @InjectRepository(User)
    private readonly dao: Repository<User>,
  ) {}

  async signin({ email, password }: Credentials): Promise<TokenPair> {
    const user = await this.dao.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("Not found user");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException("Invalid Password");
    }
    const tokenPair = await this.tokenService.generateTokenPair(user);
    user.refreshToken = tokenPair.refreshToken;
    await this.dao.save(user);
    return tokenPair;
  }

  async signup({ email, username, password }: Credentials): Promise<TokenPair> {
    const alreadyExist = await this.dao.findOne({ where: { email } });
    if (alreadyExist) {
      throw new BadRequestException(`User already exist with email: ${email}`);
    }
    const user = await this.dao.save({
      username: username,
      email: email,
      password: await bcrypt.hash(password, 10),
      refreshToken: "",
      createdAt: new Date().toISOString(),
      roles: email === "admin@mail.ru" ? [UserRole.Admin] : [],
    });
    const tokenPair = await this.tokenService.generateTokenPair(user);
    user.refreshToken = tokenPair.refreshToken;
    await this.dao.save(user);
    return tokenPair;
  }

  async refresh(refreshToken: string): Promise<string> {
    try {
      const { sub: id } = await this.tokenService.verifyToken(refreshToken);
      const user = await this.dao.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException("User not found");
      }
      console.log(user, id);
      return await this.tokenService.generateAccessToken(user);
    } catch (e: any) {
      throw new UnauthorizedException(`Invalid refresh token: ${e.message}`);
    }
  }

  async getById(id: number) {
    const user = await this.dao.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException("User not found");
    }
    const userResponse = user.take("email", "username", "id", "createdAt");
    userResponse.isAdmin = user.roles.includes(UserRole.Admin);
    return userResponse;
  }
}
