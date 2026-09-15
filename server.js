import Fastify from "fastify";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import dotenv from "dotenv";
import  {AuthRoutes}  from "./routes/auth.js";
import { UserRoutes } from "./routes/user.route.ts";

export const fastify = Fastify({ logger: true });

// config dotenv
dotenv.config({
  path: ".env.development",
});

// register here
fastify.register(AuthRoutes);
fastify.register(UserRoutes)

// Setting Congnito region

export const congintoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

// Testing the server
fastify.get("/ping", (req, reply) => {
  reply.send("pong");
});

const start = () => {
  try {
    fastify.listen({ port: process.env.SERVER_PORT, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
