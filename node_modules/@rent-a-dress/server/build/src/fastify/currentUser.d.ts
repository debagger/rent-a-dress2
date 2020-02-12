/// <reference types="node" />
import { FastifyInstance } from "fastify";
export declare const currentUserPlugin: (instance: FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse>, options: any, callback: (err?: import("fastify").FastifyError) => void) => void;
