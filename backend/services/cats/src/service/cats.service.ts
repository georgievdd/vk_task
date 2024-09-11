import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../db/entity/PostEntity";
import { Repository } from "typeorm";

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Post)
    private readonly dao: Repository<Post>,
  ) {}
  async list(page: number, limit: number) {
    const [data, total] = await this.dao.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return {
      data,
      total,
      page,
      limit,
    };
  }
  async byId(id: number) {
    return await this.dao.findOne({ where: { id } });
  }
  async create(data: Partial<Post>) {
    return await this.dao.save({
      ...data,
      createdAt: new Date().toISOString(),
    });
  }
}
