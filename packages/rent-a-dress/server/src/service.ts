import { catalogItem } from "./entity/catalogItem";
import { catalogItemOption } from "./entity/catalgItemOption";
import { FastifyRequest, FastifyReply } from "fastify";

let catalogItems: catalogItem[] = [];
for (let index = 0; index < 10; index++) {
  const item = new catalogItem();

  item.id = index;
  item.caption = "Платье";
  item.desc = "Описание платья";
  item.img = "image.jpg";

  const options: catalogItemOption[] = [
    Object.assign(new catalogItemOption(), {
      id: 123,
      size: "xl",
      color: "red"
    }),
    Object.assign(new catalogItemOption(), {
      id: 321,
      size: "xs",
      color: "white"
    })
  ];

  item.options = options;

  catalogItems.push(item);
}
export class Service {
  constructor() {}

  async getCatalog(req, reply) {
    console.log("getCatalog");
    return catalogItems;
  }

  async newCatalogItem(req, reply) {
    console.log("newCatalogItem");
    req.body.id = catalogItems.length + 1;
    catalogItems.push(req.body);
    return req.body;
  }

  async deleteCatalogItem(req: FastifyRequest, reply) {
    const id = req.params["id"];
    console.log(`deleteCatalogItem(${id})`);
const leng = catalogItems.length;
    catalogItems = catalogItems.filter(item => item.id != id);
    if(leng>catalogItems.length){
      reply.code(204);
      return "deleted";
    }else{
      reply.code(404);
      return "not found";
    }
    
  }
}
