/// <reference types="node" />
import { catalogItem } from "./entity/catalogItem";
import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "./entity/User";
import { ServerResponse } from "http";
import { Image } from "./entity/Image";
export declare class Service {
    constructor();
    getCatalog(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<void>;
    getCatalogItem(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<"Item not found" | catalogItem>;
    newCatalogItem(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<catalogItem[]>;
    updateCatalogItem(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any>;
    deleteCatalogItem(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<"Item not found" | "deleted">;
    getUserByToken(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<"Token not found" | {
        user: User;
    }>;
    userLogin(request: any, reply: any): Promise<"Password incorrect" | "User not found" | {
        token: string;
    }>;
    userLogout(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<"User logged out" | "Token not found" | "'auth._token.local' needed">;
    getUsersList(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<User[]>;
    addNewUser(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<User | "Username exist">;
    updateUser(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<User>;
    deleteUser(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<void>;
    uploadImage(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<string>;
    getImage(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<string>;
    getImageThumb(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<string>;
    getImagesForCatalogItem(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<Image[]>;
    deleteImage(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<string>;
}
