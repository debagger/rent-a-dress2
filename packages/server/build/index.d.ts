/// <reference types="node" />
import { FastifyInstance } from "fastify";
export declare const getProdServer: (nuxt: any, dbPath: string) => Promise<FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse>>;
