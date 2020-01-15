import { catalogItem } from "./entity/catalogItem";
import { FastifyRequest, FastifyReply } from "fastify";

import { User } from "./entity/User";
import { Token } from "./entity/Token";
import sharp from "sharp";
import { createConnection, Connection, getConnectionManager } from "typeorm";
import { config as fastifyConfig } from "./fastify/fastify.config";
import { ServerResponse } from "http";

import { createHash } from "crypto";
import { mkdirSync, exists, readFile, unlinkSync, existsSync } from "fs";
import { Image } from "./entity/Image";
import * as path from "path";

function parseCookie(str: string) {
  var result = {};
  if (str) {
    const SplittedString = str.split("; ");
    for (var i = 0; i < SplittedString.length; i++) {
      var item = SplittedString[i].split("=");
      result[item[0]] = unescape(item[1]);
    }
  }
  return result;
}

function Role(role?: "User"|"Admin") {
  return function(
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<
      (
        request: FastifyRequest,
        reply: FastifyReply<ServerResponse>
      ) => Promise<any>
    >
  ) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    }

    const original = descriptor.value;

    descriptor.value = async function(request, reply) {
      const cookies = parseCookie(request?.headers?.cookie);
      const cookieToken = cookies["auth._token.local"];
      console.log(cookieToken);
      if (cookieToken) {
        const db = await getDB();
        const tokens = db.getRepository(Token);
        const token = await tokens.findOne({
          token: cookieToken
        });
        if (token) {
          if (role) {
            if (token.user.role === role) {
              return await original(request, reply);
            }
            reply.code(403).send(`Forbidden. Need role "${role}"`);
          }
          return await original(request, reply);
        }
        reply.code(403).send("Forbidden. No token exist.");
        return;
      }
      reply.code(403).send("Forbidden. Auth token needed.");
      return;
    };
  };
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

  @Role("Admin") async getCatalog(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const db = await getDB();
    const catalogItems = db.getRepository(catalogItem);
    const result = await catalogItems.find({});
    reply.send(result);
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
  async getUsersList(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const db = await getDB();
    const users = db.getRepository(User);
    return users.find();
  }

  async addNewUser(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const user: User = request.body;
    const db = await getDB();
    const users = db.getRepository(User);
    const checkUsername = await users.find({ username: user.username });
    if (checkUsername.length !== 0) {
      reply.code(400);
      return "Username exist";
    }
    delete user.id;
    const dbUser = await users.save(user);
    return dbUser;
  }

  async updateUser(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const user: User = request.body;

    const db = await getDB();
    const users = db.getRepository(User);
    const dbUser = await users.findOne({ id: user.id });
    if (user.username === dbUser.username) {
      const result = await users.save(user);
      return result;
    }
    return dbUser;
  }

  async deleteUser(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const user: User = request.body;

    const db = await getDB();
    const users = db.getRepository(User);
    const dbUser = await users.findOne({ id: user.id });
    await users.delete(dbUser);
    reply.code(204);
    return;
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

      const result: Image[] = [];

      const results = files.map(
        file =>
          new Promise<Image>(async (resolve, reject) => {
            const hash = createHash("md5");
            hash.update(file.data);
            const hashDigest = hash.digest("base64");
            const image = images.create();
            image.imageName = file.filename;
            image.catalogItemId = catItem.id;
            image.hash = hashDigest;
            await images.save(image);
            result.push(image);

            const dirName = `./static/img/catalog/${catItem.id}`;
            mkdirSync(dirName, { recursive: true });
            const fileName = path.join(dirName, `${image.id}.jpg`);

            const info = await sharp(file.data).toFile(fileName);
            image.Height = info.height;
            image.Width = info.width;
            await images.save(image);

            const thumbDir = path.join(dirName, "thumbs");
            mkdirSync(thumbDir, { recursive: true });
            const thumbFilename = path.join(thumbDir, `${image.id}.jpg`);
            await sharp(file.data)
              .resize({ width: 640, height: 640, fit: "inside" })
              .jpeg({ quality: 50 })
              .toFile(thumbFilename);
            resolve(image);
          })
      );
      const res = await Promise.all(results);
      reply.send(res);
    } else {
      reply.code(404);
      return "Item not found";
    }
  }
  async getImage(request: FastifyRequest, reply: FastifyReply<ServerResponse>) {
    const db = await getDB();
    const images = db.getRepository(Image);
    const id = request.params["id"];
    const image = await images.findOne(id);
    if (image) {
      const dirName = `./static/img/catalog/${image.catalogItemId}`;
      const fileName = path.join(dirName, `${image.id}.jpg`);
      exists(fileName, exists => {
        if (exists) {
          readFile(fileName, (err, data) => {
            if (err) {
              reply.code(404);
              return err;
            } else {
              reply.type("image/jpeg").send(data);
              return;
            }
          });
        } else {
          reply.code(404);
          return "File not found";
        }
      });
    } else {
      reply.code(404);
      return "Image not found in db";
    }
  }
  async getImageThumb(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const db = await getDB();
    const images = db.getRepository(Image);
    const id = request.params["id"];
    const image = await images.findOne(id);
    if (image) {
      const dirName = `./static/img/catalog/${image.catalogItemId}/thumbs`;
      const fileName = path.join(dirName, `${image.id}.jpg`);
      exists(fileName, exists => {
        if (exists) {
          readFile(fileName, (err, data) => {
            if (err) {
              reply.code(404);
              return err;
            } else {
              reply.type("image/jpeg").send(data);
              return;
            }
          });
        } else {
          reply.code(404);
          return "File not found";
        }
      });
    } else {
      reply.code(404);
      return "Image not found in db";
    }
  }

  async getImagesForCatalogItem(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const db = await getDB();
    const images = db.getRepository(Image);
    const id = request.params["id"];
    const foundImages = await images.find({ catalogItemId: id });
    return foundImages;
  }

  async deleteImage(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ) {
    const db = await getDB();
    const images = db.getRepository(Image);
    const id = request.params["id"];
    const image = await images.findOne(id);
    if (image) {
      const dirName = `./static/img/catalog/${image.catalogItemId}`;
      const fileName = path.join(dirName, `${image.id}.jpg`);
      if (existsSync(fileName)) unlinkSync(fileName);

      const thumbDir = path.join(dirName, "thumbs");
      const thumbFilename = path.join(thumbDir, `${image.id}.jpg`);
      if (existsSync(thumbFilename)) unlinkSync(thumbFilename);
      await images.delete(image);
      reply.code(204);
      return;
    } else {
      reply.code(404);
      return "Image not found";
    }
  }
}
