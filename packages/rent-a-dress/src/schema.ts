import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { getFromContainer, MetadataStorage } from "class-validator";
import { defaultMetadataStorage } from 'class-transformer/storage'
import { writeFileSync } from "fs";

import "./entity/Image";
import "./entity/Token";
import "./entity/User";
import "./entity/catalogItem";

export function generateSchemas(){
const metadatas = (getFromContainer(MetadataStorage) as any)
  .validationMetadatas;
const schemas = validationMetadatasToSchemas(metadatas, {
    classTransformerMetadataStorage: defaultMetadataStorage // 2) Define class-transformer metadata in options
  });
writeFileSync(`oapi/definitions.json`, JSON.stringify({definitions:schemas}, null, 1), {
    encoding: "utf8"
  }); 
}

generateSchemas()