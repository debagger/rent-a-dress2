"use strict";
const fp = require("fastify-plugin");
const Engine = require("tingodb")();
const tcursor = require("../node_modules/tingodb/lib/tcursor");
const { promisify } = require("util");

tcursor.prototype.asyncToArray = promisify(tcursor.prototype.toArray);
tcursor.prototype.asyncCount = promisify(tcursor.prototype.count);
tcursor.prototype.asyncClose = promisify(tcursor.prototype.close);

const dataDir = "./data";

const db = new Engine.Db(dataDir, {});

function getCollection(name) {
    const coll = db.collection(name);
    coll.asyncInsert = promisify(coll.insert);
    coll.asyncRemove = promisify(coll.remove);
    coll.asyncSave = promisify(coll.save);
    coll.asyncUpdate = promisify(coll.update);
    coll.asyncCount = promisify(coll.count);
    coll.asyncDrop = promisify(coll.drop);
    coll.asyncfindAndRemove = promisify(coll.findAndRemove);
    coll.asyncFind = promisify(coll.find);
    coll.asyncFindOne = promisify(coll.findOne);
    coll.asyncFindAndModify = promisify(coll.findAndModify);
    return coll;
  }

function dbPlugin(fastify, config, done) {
  fastify.decorate("getCollection", getCollection);
  done();
}

module.exports = fp(dbPlugin);
