/// <reference types="node" />
export declare const config: {
    fastify: {
        logger: {
            level: string;
            file: string;
        };
        https: {
            key: Buffer;
            cert: Buffer;
        };
    };
    ajv: {
        removeAdditional: boolean;
        useDefaults: boolean;
        coerceTypes: boolean;
        allErrors: boolean;
        nullable: boolean;
    };
    hash: (input: string) => string;
};
