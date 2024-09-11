import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../../helpers";
import { filter } from "rxjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string;

  @Column("simple-array")
  roles: UserRole[];

  @Column()
  createdAt: string = new Date().toISOString();

  take(...fields: string[]): Record<string, any> {
    const result = {};
    fields.forEach((field) => (result[field] = this[field]));
    return result;
  }
}
