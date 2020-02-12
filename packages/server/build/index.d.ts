/// <reference types="node" />
import { Configuration } from "@nuxt/types";
import { FastifyInstance } from "fastify";
export declare const getProdServer: (nuxtConfig: Configuration, dbPath: string) => Promise<FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse>>;
