import dotenv from "dotenv";
import { verifConnection } from "./config/database.config";
import { createApp } from "./app";

dotenv.config();

async function start() {
  await verifConnection();
  const app = createApp();
  const port = process.env.PORT;

  app.listen(port, () => {
    console.log("Server listening on port: ", port);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
