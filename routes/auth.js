import { AuthLoginValidate } from "../controllers/auth.controller.ts";

export function AuthRoutes(fastify, options, done) {
  
  fastify.post("/auth/login", async (req, reply) => {
    const { username, password } = req.body;
    const verifyLogin = await AuthLoginValidate({username, password});
    reply.send(verifyLogin);
  });

  done();
}
