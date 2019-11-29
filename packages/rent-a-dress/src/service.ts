const catalogItems = [];
for (let index = 0; index < 10; index++) {
  const item = {
    id: index,
    caption: "Платье",
    desc:"Описание платья",
    img:"image.jpg"
  }
  catalogItems.push(item);
}
export class Service {
  constructor() {

  }

  private catalogItems:any;

  async getCatalog(req, reply) {
    console.log("getCatalog", catalogItems);
    reply.send(catalogItems);
  }


  async newCatalogItem(req, reply) {
    console.log("newCatalogItem", req.body);
    catalogItems.push(req.body);
    return req.body;
  }

  async catalog(req, reply) {
    console.log("catalog", req.params);
    return { key: "value" };
  }

  async getCatalogItem(req, reply) {
    console.log("getCatalogItem", req.params);
    return { key: "value" };
  }

  async updateCatalogItem(req, reply) {
    console.log("updateCatalogItem", req.params);
    return { key: "value" };
  }


  async deleteCatalogItem(req, reply) {
    console.log("deleteCatalogItem", req.params);
    return { key: "value" };
  }


  async catalogById(req, reply) {
    console.log("catalogById", req.params);
    return { key: "value" };
  }

}


