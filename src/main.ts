import app from "./app";
import { connectMongo } from "./services/connection";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  try {
    await connectMongo();
    console.log("Database connection successful");

    app.listen(process.env.PORT, () => {
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
}

main();
