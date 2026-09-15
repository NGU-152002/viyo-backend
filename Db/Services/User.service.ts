import { fastify } from "../../server.js";
import { MongoDB } from "../index.ts";
import { Users, type UserInterface } from "../schema/Users.schema.ts";



export const createUser = async (
  user: UserInterface,
): Promise<UserInterface | unknown> => {
  try {
    const db = await MongoDB.setCollection("Viyo",'users');

    const responseFromMongo = await db.insertOne(user);
    return responseFromMongo;
  } catch (err) {
    fastify.log.error(err);
    return "Someething went wrong while creating user";
  }
};
