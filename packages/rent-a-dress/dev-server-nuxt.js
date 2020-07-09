const nuxtConfig = require("./nuxt.config");
const path = require("path");
const { Nuxt, Builder } = require("nuxt");
nuxtConfig.dev = true;
const nuxt = new Nuxt(nuxtConfig);
const builder = new Builder(nuxt);
builder.build();
process.env.DATABASE_PATH = ":memory:";
process.env.IMG_PATH = "C:\\Projects\\images";
process.env.HTTP_MODE = "http"
const run = require("@rent-a-dress/nest-server/workflow/ts-watcher");

run(nuxt);
