"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const class_validator_1 = require("class-validator");
const storage_1 = require("class-transformer/storage");
const fs_1 = require("fs");
require("./entity/Image");
require("./entity/Token");
require("./entity/User");
require("./entity/catalogItem");
function generateSchemas() {
    const metadatas = class_validator_1.getFromContainer(class_validator_1.MetadataStorage)
        .validationMetadatas;
    const schemas = class_validator_jsonschema_1.validationMetadatasToSchemas(metadatas, {
        classTransformerMetadataStorage: storage_1.defaultMetadataStorage // 2) Define class-transformer metadata in options
    });
    fs_1.writeFileSync(`server/oapi/definitions.json`, JSON.stringify({ definitions: schemas }, null, 2), {
        encoding: "utf8"
    });
    const specstring = fs_1.readFileSync("server/oapi/openapi.json", "utf8");
    const spec = JSON.parse(specstring);
    spec["components"]["schemas"] = schemas;
    fs_1.writeFileSync(`server/oapi/openapi-defs.json`, JSON.stringify(spec, null, 1), {
        encoding: "utf8"
    });
    console.log("Generated server/oapi/openapi-defs.json");
}
exports.generateSchemas = generateSchemas;
generateSchemas();
//# sourceMappingURL=schema.js.map