import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test123",
    database: "task",
    synchronize: true,
    logging: false,
    entities: ['../**/*_entity.{ts,js}'],
    migrations: [],
    subscribers: [],
})
