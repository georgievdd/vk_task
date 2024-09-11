import * as process from "process";
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

export function resolveEnv(envOrDefault: string) {
  const str = envOrDefault.slice(2, envOrDefault.length - 1);
  const [key, defaultValue] = str.split(":");
  const env = process.env[key];
  return env || defaultValue;
}

export async function waitForCondition(
  func: () => boolean,
  max: number = 10000,
  interval: number = 100,
) {
  return new Promise<void>((resolve, reject) => {
    const start = Date.now();
    const checkCondition = () => {
      try {
        if (func()) {
          resolve();
        } else if (Date.now() - start > max) {
          reject(new Error("Condition not met within the timeout period"));
        } else {
          // Иначе, проверяем условие через заданный интервал времени
          setTimeout(checkCondition, interval);
        }
      } catch (error) {
        reject(error);
      }
    };
    checkCondition();
  });
}

export enum UserRole {
  Admin = "Admin",
}

export const ValidateNotUndefined = createParamDecorator(
  (fields: string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const object = request.body;
    const undefinedFields: string[] = [];
    fields.forEach((key) => {
      if (object[key] === undefined) {
        undefinedFields.push(key);
      }
    });
    if (undefinedFields.length > 0) {
      throw new BadRequestException(
        `Required fields: ${undefinedFields.join(", ")}`,
      );
    }

    return object;
  },
);

export function parseCookie(cookie: string): any {
  const result = {};
  cookie.split(";").forEach((str) => {
    const [key, value] = str.trim().split("=");
    result[key] = value;
  });
  return result;
}
