import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { UserInterface } from "../Db/schema/Users.schema.ts";
import { userCreate } from "../controllers/user.controller.ts";

export const UserRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  done: () => void,
) => {
  fastify.post(
    "/user/create",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const userDoc: UserInterface = req.body as UserInterface;
      const responseFromUserCreation = await userCreate(userDoc);
      reply.send(responseFromUserCreation);
    },
  );
  done();
};
