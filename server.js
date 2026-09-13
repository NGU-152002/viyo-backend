const fastify = require("fastify")({ logger: true });
require("dotenv").config({
    path:".env.development"
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

start()