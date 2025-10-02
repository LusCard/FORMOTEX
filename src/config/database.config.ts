import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "database",
  process.env.DB_USER || "user",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export async function verifConnection() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log("Error en la coneccion a la base de datos", error);
  }
}

export default sequelize;
