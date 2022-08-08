import "reflect-metadata";
import { DataSource } from "typeorm";
import { Play } from "./entity/play";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "sportradar",
  password: "sportradar",
  database: "sportradardb",
  synchronize: true,
  logging: false,
  entities: [Play],
  migrations: [],
  subscribers: [],
});
