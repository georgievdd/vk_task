import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Eureka } from "eureka-js-client";
import { ConfigService } from "@nestjs/config";
import { Config } from "../middleware/config.middleware";
import { resolveEnv } from "../helpers";

@Injectable()
export default class EurekaService implements OnModuleInit, OnModuleDestroy {
  private client: Eureka;
  private createClient(config: Config) {
    return new Eureka({
      instance: {
        app: config.service,
        hostName: "localhost",
        ipAddr: "127.0.0.1",
        port: {
          $: +resolveEnv(config.server.port),
          "@enabled": true,
        },
        vipAddress: config.service,
        dataCenterInfo: {
          "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
          name: "MyOwn",
        },
      },
      eureka: {
        host: resolveEnv(config.eureka.host),
        port: +config.eureka.port,
        servicePath: "/eureka/apps/",
      },
    });
  }

  constructor(private configService: ConfigService) {
    const config = configService.get("config");
    this.client = this.createClient(config);
  }

  async onModuleInit() {
    this.client.start((error) => {
      if (error) {
        console.error("Failed to start Eureka client:", error);
      } else {
        console.log("Eureka client started successfully");
      }
    });
  }

  onModuleDestroy() {
    this.client.stop();
    console.log("Eureka client stopped");
  }
}
