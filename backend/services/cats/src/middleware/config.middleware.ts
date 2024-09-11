import axios from "axios";

const add = (key: string, value: any, object: Record<string, any>) => {
  const keys = key.split(".");
  let it = object;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      return;
    }
    if (!object.hasOwnProperty(key)) {
      it[key] = {};
    }
    it = it[key];
  });
  it[keys.at(-1)] = value;
};
function getConfigObject(propertySources: any) {
  const config = propertySources.reduce((acc, source) => {
    return { ...acc, ...source.source };
  }, {});
  const result = {};
  Object.keys(config).forEach((key) => {
    add(key, config[key], result);
  });
  return { config: result };
}
function extractUrlInfo(path: string) {
  const [ho, st, port] = path.split("/")[2].split(":");
  return [ho + ":" + st, port];
}
function prepare(config: { config: any }): {
  config: Config;
} {
  const eurekaUrl = config.config.eureka.client["service-url"].defaultZone;
  const [host, port] = extractUrlInfo(eurekaUrl);
  delete config.config.eureka;
  add("eureka.port", port, config.config);
  add("eureka.host", host, config.config);
  return config;
}
export default function (service: string) {
  return async function () {
    const configResponse = await axios.get(
      `http://localhost:8888/${service}/default`,
    );
    const propertySources = configResponse.data.propertySources;
    const config = getConfigObject(propertySources);
    add("service", service, config.config);
    return prepare(config as any);
  };
}

export interface JwtConfig {
  key: string;
  "access-token-expiration": string;
  "refresh-token-expiration": string;
}

export interface Config {
  server: { port: string };
  jwt: JwtConfig;
  eureka: {
    port: string;
    host: string;
  };
  service: string;
  db: {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
  };
}
