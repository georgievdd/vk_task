import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { CatsService } from "../service/cats.service";
import { Authorized } from "../middleware/authguard";
import { HasRoles } from "../middleware/rolesguard";
import { UserRole, ValidateNotUndefined } from "../helpers";
import { Post as PostEntity } from "../db/entity/PostEntity";
import { LikeService } from "../service/like.service";
import { Request, Response } from "express";

@Controller()
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly likeService: LikeService,
  ) {}

  @Get()
  async list(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Res() res: Response,
  ) {
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const cats = await this.catsService.list(pageNumber, pageSize);
    return res.status(200).json(cats);
  }
  @Get(":id")
  async byId(@Param("id") id: string, @Res() res: Response) {
    return res.status(200).json(await this.catsService.byId(+id));
  }
  @Get("favorites")
  @Authorized()
  async favorites(
    @Param("id") id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const { sub: userId } = (req as any).user;
    return res.status(200).json(await this.likeService.favorites(userId));
  }
  @Post()
  @HasRoles(UserRole.Admin)
  async create(
    @ValidateNotUndefined(["imgUrl", "title"])
    @Body()
    data: PostEntity,
    @Res() res: Response,
  ) {
    return res.status(200).json(await this.catsService.create(data));
  }
  @Post("like/:id")
  @Authorized()
  async like(
    @Param("id") id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { sub: userId } = (req as any).user;
    return res.status(200).json(await this.likeService.like(+id, userId));
  }
}
