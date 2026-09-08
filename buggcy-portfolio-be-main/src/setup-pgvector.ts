import { DataSource } from "typeorm";
import { config } from "dotenv";

config();

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
});

async function main() {
  try {
    await dataSource.initialize();
    console.log("Data Source has been initialized!");
    await dataSource.query(`CREATE EXTENSION IF NOT EXISTS vector;`);
    console.log("pgvector extension created/verified successfully.");
  } catch (err) {
    console.error("Error during Data Source initialization or query execution", err);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

main();
