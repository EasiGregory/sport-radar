import "reflect-metadata";
import { DataSource } from "typeorm";
import { Game } from "./entity/game";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "sportradar",
  password: "sportradar",
  database: "sportradardb",
  synchronize: true,
  logging: false,
  entities: [Game],
  migrations: [],
  subscribers: [],
});
