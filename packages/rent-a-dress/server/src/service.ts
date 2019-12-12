import { catalogItem } from "./entity/catalogItem";
import { catalogItemOption } from "./entity/catalgItemOption";
import { FastifyRequest, FastifyReply } from "fastify";

import { User } from "./entity/User";
import { Token } from "./entity/Token";

import {
  createConnection,
  Connection,
  getConnectionManager,
  getConnection
} from "typeorm";
import { config as fastifyConfig } from "./fastify/fastify.config";
import { ServerResponse } from "http";

let catalogItems: catalogItem[] = [];
for (let index = 0; index < 10; index++) {
  const item = new catalogItem();

  item.id = index;
  item.caption = "Платье";
  item.desc = "Описание платья";
  item.img = "image.jpg";

  const options: catalogItemOption[] = [
    Object.assign(new catalogItemOption(), {
      id: 123,
      size: "xl",
      color: "red"
    }),
    Object.assign(new catalogItemOption(), {
      id: 321,
      size: "xs",
      color: "white"
    })
  ];

  item.options = options;

  catalogItems.push(item);
}

let _db: Connection;

async function getDB(): Promise<Connection> {
  if (!_db) {
    const mgr = getConnectionManager();
    if (mgr.has("default")) {
      _db = mgr.get("default");
    } else {
      _db = await createConnection();
    }
  }
  return _db;
}

export class Service {
  constructor() {}

  async getCatalog(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const db = await getDB();
    const catalogItems = db.getRepository(catalogItem);
    return await catalogItems.find();
  }
  async getCatalogItem(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const id = request.params["id"];
    const db = await getDB();
    const catalogItems = db.getRepository(catalogItem);
    const foundItem = await catalogItems.findOne(id);
    if (foundItem) {
      return foundItem;
    } else {
      reply.code(404);
      return "Item not found";
    }
  }
   
  async newCatalogItem(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const db = await getDB();
    const catalogItems = db.getRepository(catalogItem);
    delete request.body.id;
    const newItem = catalogItems.create(request.body);
    const savedItem = await catalogItems.insert(newItem);
    return newItem;
  }

  async updateCatalogItem(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const db = await getDB();
    const catalogItems = db.getRepository(catalogItem);
    const dbItem = await catalogItems.findOne(request.body.id);
    if (dbItem) {
      const result = await catalogItems.save(request.body);
      return result;
    } else {
      reply.code(404);
      return "Item not found";
    }
  }

  async deleteCatalogItem(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const idToDelete = request.params["id"];
    console.log(`deleteCatalogItem(${idToDelete})`);
    const db = await getDB();
    const catalogItems = db.getRepository(catalogItem);
    const itemToDelete = await catalogItems.findOne(idToDelete);
    if (itemToDelete) {
      await catalogItems.remove(itemToDelete);
      reply.code(204);
      return "deleted";
    } else {
      reply.code(404);
      return "Item not found";
    }
  }

  async getUserByToken(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const token: string = request["cookies"]["auth._token.local"];
    console.log("token = ", token);
    const db = await getDB();
    const tokens = db.getRepository(Token);

    const dbToken = await tokens.findOne({ token: token });
    if (dbToken) {
      return { user: dbToken.user };
    }
    reply.code(404);
    return "Token not found";
  }

  async userLogin(request, reply) {
    const userLogin: { username: string; password: string } = request.body;
    console.log(userLogin);
    const db = await getDB();
    const users = db.getRepository(User);
    const dbUser = await users.findOne({ username: userLogin.username });
    if (dbUser) {
      const inputHash = fastifyConfig.hash(userLogin.password);
      if (dbUser.password === inputHash) {
        const Tokens = db.getRepository(Token);

        const token = fastifyConfig.hash(
          `${Date.now()}.${dbUser.username}.${dbUser.password}`
        );

        const newToken = new Token();
        newToken.user = dbUser;
        newToken.token = token;
        const savedToken = await Tokens.manager.save(newToken);

        return { token: savedToken.token };
      } else {
        reply.code(404);
        return "Password incorrect";
      }
    } else {
      reply.code(404);
      return "User not found";
    }
  }
  async userLogout(request, reply) {
    const cookieToken: string = request["cookies"]["auth._token.local"];
    if (cookieToken) {
      const db = await getDB();
      const tokens = db.getRepository(Token);
      const dbToken = await tokens.findOne({ token: cookieToken });

      if (dbToken) {
        const result = await tokens.remove(dbToken);
        return "User logged out";
      }
      reply.code(404);
      return "Token not found";
    }
    reply.code(404);
    return "'auth._token.local' needed";
  }
}
