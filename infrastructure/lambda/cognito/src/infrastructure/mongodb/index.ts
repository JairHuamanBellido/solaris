import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const database = process.env.MONGODB_DATABASE || "";
let cacheDb: Db | null = null;

export async function connectToDatabase() {
  if (cacheDb) {
    return cacheDb;
  }

  const client = await MongoClient.connect(uri);
  const db = await client.db(database.toLowerCase());

  cacheDb = db;
  return db;
}
