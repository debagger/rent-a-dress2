"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_jsonschema_1 = require("class-validator-jsonschema");
var class_validator_1 = require("class-validator");
var storage_1 = require("class-transformer/storage");
var fs_1 = require("fs");
require("./entity/Image");
require("./entity/Token");
require("./entity/User");
require("./entity/catalogItem");
function generateSchemas() {
    var metadatas = class_validator_1.getFromContainer(class_validator_1.MetadataStorage)
        .validationMetadatas;
    var schemas = class_validator_jsonschema_1.validationMetadatasToSchemas(metadatas, {
        classTransformerMetadataStorage: storage_1.defaultMetadataStorage // 2) Define class-transformer metadata in options
    });
    fs_1.writeFileSync("oapi/definitions.json", JSON.stringify({ definitions: schemas }, null, 1), {
        encoding: "utf8"
    });
}
exports.generateSchemas = generateSchemas;
generateSchemas();
//# sourceMappingURL=schema.js.map