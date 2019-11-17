module.exports = function(fastify, config, done) {
  const Users = fastify.getCollection("users");

 const isAdmin = fastify.isAdmin;

  fastify.get(
    "/api/auth/changepassword",
    { preHandler: isAdmin },
    async function(request, reply) {
      try {
        reply.send(await Users.find().asyncToArray());
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.post(
    "/api/auth/login",
    {
      schema: {
        body: {
          required: ["username", "password"],
          properties: {
            username: { type: "string" },
            password: { type: "string" }
          },

          additionalProperties: false
        }
      }
    },
    async function(request, reply) {
      try {
        const foundUser = await Users.asyncFindOne({
          username: request.body.username
        });

        if (!foundUser) {
          reply.code(403).send("No user with this username");
          return;
        }

        if (foundUser.password !== config.hash(request.body.password)) {
          reply.code(403).send("Wrong password");
          return;
        }

        const token = config.hash(
          `${Date.now()}.${foundUser.username}.${foundUser.password}`
        );

        if (
          (item = await Users.asyncFindAndModify(
            { username: foundUser.username, password: foundUser.password },
            [],
            { $set: { token: `${token}` } },
            { new: true }
          ))
        ) {
          reply.send({ token: item.token });
          return;
        }

        reply.send(new Error("Something goes wrong"));
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.post("/api/auth/logout", async function(request, reply) {
    const token = request.cookies["auth._token.local"];
    if (!token) {
      reply.code(400).send("Need cookie: 'auth._token.local'");
    }

    let item = await Users.asyncFindOne({ token: token });
    if (!item) {
      reply.code(400).send(`Not found user session with token ${token}`);
    }
    if (
      (item = await Users.asyncFindAndModify(
        item,
        [],
        { $set: { token: undefined } },
        { new: true }
      ))
    ) {
      reply.send(`User ${item.username} was logged out`);
      return;
    }
  });

  fastify.get("/api/auth/user", async function(request, reply) {
    const token = request.cookies["auth._token.local"];
    if (!token) {
      reply.code(400).send("Need cookie: 'auth._token.local'");
    }

    try {
      const item = await Users.asyncFindOne({ token: token });
      if (!item) {
        reply.code(400).send(`Not found user session with token ${token}`);
      }
      reply.send({ user: item });
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get("/api/auth/users", { preHandler: isAdmin }, async function(
    request,
    reply
  ) {
    try {
      const allUsers = await Users.find().asyncToArray();
      reply.send(
        allUsers.map(item => ({
          username: item.username,
          email: item.email,
          role: item.role ? item.role : "user"
        }))
      );
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.post(
    "/api/auth/adduser",
    {
      preHandler: isAdmin,
      schema: {
        body: {
          required: ["username", "password", "email"],
          properties: {
            username: { type: "string" },
            email: { type: "string" },
            password: { type: "string" }
          },
          additionalProperties: false
        }
      }
    },
    async function(request, reply) {
      try {
        const newUser = request.body;
        const foundUser = await Users.asyncFindOne(
          { username: newUser.username },
          []
        );

        if (foundUser) {
          reply.code(400).send(`User ${newUser.username} exist`);
          return;
        }

        newUser.password = config.hash(newUser.password);
        newUser.role = "user";
        const result = await Users.asyncInsert([newUser]);
        if (result && result.length == 1) {
          reply.send(`User ${result[0].username} added`);
          return;
        }
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.post(
    "/api/auth/edituser",
    {
      preHandler: isAdmin,
      schema: {
        body: {
          required: ["username", "email"],
          properties: {
            username: { type: "string" },
            email: { type: "string" },
            role: { type: "string" }
          },
          additionalProperties: false
        }
      }
    },
    async function(request, reply) {
      try {
        const userChanges = request.body;
        const foundUser = await Users.asyncFindOne(
          { username: userChanges.username },
          []
        );

        if (!foundUser) {
          reply.code(400).send(`User ${foundUser.username} not found`);
          return;
        }
        const result = await Users.asyncFindAndModify(
          { username: userChanges.username },
          [],
          { $set: userChanges },
          { new: true }
        );
        reply.send({
          username: result.username,
          email: result.email,
          role: result.role
        });
      } catch (error) {
        reply.send(error);
      }
    }
  );

  done();
};
