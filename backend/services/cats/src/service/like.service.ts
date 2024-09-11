import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../db/entity/PostEntity";
import { Repository } from "typeorm";
import { Like } from "../db/entity/LikeEntity";

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly dao: Repository<Like>,
  ) {}
  async like(postId: number, userId: number) {
    const like = await this.dao.findOne({ where: { userId, postId } });
    if (like) {
      await this.dao.delete(like);
      return { status: "deleted" };
    }
    await this.dao.save({
      userId,
      postId,
      createdAt: new Date().toISOString(),
    });
    return { status: "created" };
  }

  async favorites(userId: number) {
    return await this.dao.find({
      where: { userId },
    });
  }
}
