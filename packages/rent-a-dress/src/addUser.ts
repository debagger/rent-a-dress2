import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Token } from "./entity/Token";

import {config} from  "./fastify/fastify.config";

createConnection()
  .then(async connection => {
    const user = new User();
    user.username = "debagger";
    user.email = "debagger@gmail.com";
    user.role = "admin";
    user.password = config.hash("123");
    await connection.manager.save(user);

    const token = new Token();
    token.token='123';
    token.user = user;

    await connection.manager.save(token);

    console.log("User saved");
    const savedUser = await connection.manager.findOne(User, {username: user.username});

    console.log(savedUser);
  })
  .catch(err => {
    console.log(err);
  });
