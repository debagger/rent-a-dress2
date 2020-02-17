/// <reference types="node" />
import { FastifyInstance } from "fastify";
export declare function getProdServer(nuxt: any, dbPath: string): Promise<FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse>>;
export declare function runDevServer(nuxt: any, dbPath: string): Promise<void>;
