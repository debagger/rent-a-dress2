process.env.DATABASE_PATH = ":memory:";
process.env.IMG_PATH = "C:\\Projects\\images";
process.env.HTTP_MODE = "http"
require("./packages/nest-server/workflow/ts-compiler");