const doasync = require("doasync");
const Engine = require("tingodb")();
const { promisify } = require("util");

const tcursor = require("./node_modules/tingodb/lib/tcursor");

tcursor.prototype.asyncToArray = promisify(tcursor.prototype.toArray);
tcursor.prototype.asyncCount = promisify(tcursor.prototype.count);
tcursor.prototype.asyncClose = promisify(tcursor.prototype.close);



Engine.Collection.prototype.asyncInsert = promisify(
  Engine.Collection.prototype.insert
);
Engine.Collection.prototype.asyncRemove = promisify(
  Engine.Collection.prototype.remove
);
Engine.Collection.prototype.asyncSave = promisify(
  Engine.Collection.prototype.save
);
Engine.Collection.prototype.asyncUpdate = promisify(
  Engine.Collection.prototype.update
);
Engine.Collection.prototype.asyncCount = promisify(
  Engine.Collection.prototype.count
);
Engine.Collection.prototype.asyncDrop = promisify(
  Engine.Collection.prototype.drop
);
Engine.Collection.prototype.asyncfindAndRemove = promisify(
  Engine.Collection.prototype.findAndRemove
);
Engine.Collection.prototype.asyncFind = promisify(
  Engine.Collection.prototype.find
);
Engine.Collection.prototype.asyncFindOne = promisify(
  Engine.Collection.prototype.findOne
);

Engine.Collection.prototype.asyncFindAndModify = promisify(
  Engine.Collection.prototype.findAndModify
);

const dataDir = "./data";

const db = new Engine.Db(dataDir, {});

const users = db.collection("Users");
users
  .find()
  .asyncToArray()
  .then(result => {
    console.table(result);
  });

users.asyncFindOne({ username: "admin" }).then(result => {
  console.log(result);
});

users
  .find()
  .asyncCount()
  .then(result => {
    console.log(result);
  });

users.asyncFind().then(result => {
  console.log(result);
});
