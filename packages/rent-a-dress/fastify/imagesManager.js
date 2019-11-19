const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

module.exports = function(fastify, config, done) {
  fastify.register(require("fastify-file-upload"));

  fastify.post("/api/images/upload", async function(request, reply) {
    const files = Object.values(request.raw.files);
    console.log(request.raw.files);
    const uploadedImages = [];

    for (let index = 0; index < files.length; index++) {
      try {
        const element = files[index];
        const filename = element.md5 + ".jpg";
        await writeFileAsync(
          path.join(__dirname, "static","img", filename),
          element.data
        );
        uploadedImages.push(filename);
      } catch (error) {
        console.log(error);
      }
    }
    reply.send({ result: uploadedImages });
  });
  done();
};
