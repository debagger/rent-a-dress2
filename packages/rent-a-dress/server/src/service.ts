import { catalogItem } from "./entity/catalogItem";
import { catalogItemOption } from "./entity/catalgItemOption";
import { FastifyRequest, FastifyReply } from "fastify";

import { User } from "./entity/User";
import { Token } from "./entity/Token";
import sharp from "sharp";
import {
  createConnection,
  Connection,
  getConnectionManager,
  getConnection
} from "typeorm";
import { config as fastifyConfig } from "./fastify/fastify.config";
import { ServerResponse } from "http";

import { createHash, HashOptions } from "crypto";
import { createWriteStream, writeFile, mkdirSync } from "fs";
import { Readable } from "stream";
import { Image } from "./entity/Image";
import * as path from "path";
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
  async userLogout(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
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

  async uploadImage(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const db = await getDB();
    const images = db.getRepository(Image);
    const catalogItems = db.getRepository(catalogItem);
    const catItem = await catalogItems.findOne(request.body.itemId);
    if (catItem) {
      const files: {
        data: Buffer;
        filename: string;
        limit: boolean;
        mimetype: string;
      }[] = request.body.files;

      for (const file of files) {
        const hash = createHash("md5");
        hash.update(file.data);
        const hashDigest = hash.digest("base64");
        console.log(file.filename + ": " + hashDigest);
        const image = images.create();
        image.imageName = file.filename;
        image.catalogItemId = catItem.id;
        image.hash = hashDigest;
        await images.save(image);
        const dirName = `./static/img/catalog/${catItem.id}`;
        mkdirSync(dirName, { recursive: true });
        const fileName = path.join(dirName, `${image.id}.jpg`);
        writeFile(fileName, file.data, err => {
          if (err) {
            throw err;
          }
          const thumbDir = path.join(dirName, "thumbs");
          mkdirSync(thumbDir, { recursive: true });
          const thumbFilename = path.join(thumbDir, `${image.id}.jpg`);
          sharp(file.data)
            .resize({ width: 640, height: 640, fit: "inside" })
            .jpeg({ quality: 50 })
            .toFile(thumbFilename, (err, info) => {
              if (err) {
                throw err;
              } else {
                console.log(info);
              }
            });
        });
      }
      return "OK";
    } else {
      reply.code(404);
      return "Item not found";
    }
  }
}
