import connectMongo from "connect-mongo";
import env from "dotenv";
import { MongoClient } from "mongodb";

env.config();

const mongoUri = process.env.MONGOURI;
async function connectToDb() {
  try {
    const client = await MongoClient.connect(mongoUri);
    const db = client.db("InstaClone");
    const sessionStore = connectMongo.create({
      client: client,
      dbName: "sessions", // You can choose a different database name
      collectionName: "sessions",
    });

    return { db, sessionStore };
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

const { db, sessionStore } = await connectToDb();

export { db, sessionStore };
