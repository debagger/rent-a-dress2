/// <reference types="node" />
import "reflect-metadata";
import Fastify from "fastify";
export declare function myFastify(nuxt: any): () => Fastify.FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse>;
