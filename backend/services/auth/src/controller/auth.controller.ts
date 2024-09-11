import { AuthService } from "../service/auth.service";
import { Credentials } from "../model/dto/credentials";
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { parseCookie, ValidateNotUndefined } from "../helpers";
import { Authorized } from "../middleware/authguard";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  async signin(
    @ValidateNotUndefined(["email", "password"])
    @Body()
    body: Credentials,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signin(body);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ accessToken });
  }

  @Post("signup")
  async signup(
    @Body()
    @ValidateNotUndefined(["email", "password", "username"])
    body: Credentials,
    @Res()
    res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signup(body);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken });
  }

  @Post("refresh")
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const { refreshToken } = parseCookie(req.headers.cookie);
      if (!refreshToken) {
        throw new Error();
      }
      const accessToken = await this.authService.refresh(refreshToken);
      return res.json({ accessToken });
    } catch {
      throw new UnauthorizedException("Refresh token not found");
    }
  }

  @Get("check")
  @Authorized()
  async check(@Res() res: Response) {
    return res.status(200).json();
  }

  @Get("me")
  @Authorized()
  async me(@Req() req: any, @Res() res: Response) {
    const user = await this.authService.getById(+req.user.sub);
    res.status(200).json(user);
  }
}
