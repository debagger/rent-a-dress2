import { catalogItem } from "./entity/catalogItem";
import { catalogItemOption } from "./entity/catalgItemOption";
const catalogItems: catalogItem[] = [];
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
    req.body.id = catalogItems.length+1;
    catalogItems.push(req.body);
    return req.body;
  }
}
