import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  imgUrl: string;

  @Column()
  createdAt: string = new Date().toISOString();

  take(...fields: string[]): Record<string, any> {
    const result = {};
    fields.forEach((field) => (result[field] = this[field]));
    return result;
  }
}
