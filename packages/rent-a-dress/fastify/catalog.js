const items = [...Array(10).keys()].map(id => ({
  id: id,
  caption: `Красивое платье № ${id}`,
  price: id * 1000,
  img: `${id}.jpg`,
  details: {
    otherImgs: ["1.jpg", "2.jpg", "3.jpg"],
    desc: "Самое замечательное что может быть " + id
  }
}));

module.exports = function(fastify, config, done) {
  const Catalog = fastify.getCollection("catalog");

  fastify.get("/api/catalog/items", async function(request, reply) {
    reply.send(items.map(item => item.id));
  });

  fastify.get(
    "/api/catalog/item/:id",
    {
      schema: {
        params: {
          id: { type: "number" }
        }
      }
    },
    async function(request, reply) {
      reply.send(items.find(item => item.id === request.params.id));
    }
  );

  fastify.get(
    "/api/catalog/item/:id/details",
    {
      schema: {
        params: {
          id: { type: "number" }
        }
      }
    },
    async function(request, reply) {
      reply.send(items.find(item => item.id === request.params.id).details);
    }
  );

  fastify.post(
    "/api/catalog/new",
    {
      preHandler: fastify.isAdmin,
      schema: {
        body: {
          required: ["id", "caption", "price", "img", "details"],
          properties: {
            id: { type: "number" },
            caption: { type: "string" },
            price: { type: "number" },
            img: { type: "string" },
            details: {
              type: "object",
              properties: {
                otherImgs: { type: "array", items: { type: "string" } },
                desc: { type: "string" }
              }
            }
          },
          additionalProperties: false
        }
      }
    },
    async function(request, reply) {
      const id = Math.max(...items.map(item => item.id)) + 1;
      request.body.id = id;
      items.push(request.body);
      reply.send(request.body);
    }
  );

  done();
};
