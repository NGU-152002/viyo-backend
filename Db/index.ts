import mongoose from "mongoose";
import dns from "node:dns";
import { schemas } from "./Schema.list.ts";
export class MongoDB {
  static async getInstance() {
    if (mongoose.connection.readyState != 1) {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
      await mongoose.connect(process.env.MONGO_URI || "");

      return mongoose;
    }

    return mongoose;
  }

  static async setDb(DbName: string) {
    await this.getInstance();
    return mongoose.connection.useDb(DbName);
  }

  static async setCollection(dbName: string, collectionName: string) {
    await this.getInstance();
    const db = mongoose.connection.useDb(dbName);
    const schema = schemas[collectionName as keyof typeof schemas];
    if (!schema) throw new Error(`${collectionName} schema not found`);
    return db.model(collectionName, schema, collectionName);
  }
}
