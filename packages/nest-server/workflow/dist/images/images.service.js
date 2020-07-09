"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_1 = require("../entity");
const sharp = require("sharp");
const crypto_1 = require("crypto");
const path = require("path");
const fs = require("fs");
const image_dto_1 = require("./image.dto");
const thumbs = [
    { sizename: 'small', size: 320 },
    { sizename: 'medium', size: 640 },
    { sizename: 'big', size: 1024 },
];
let ImagesService = class ImagesService {
    constructor(images, conf) {
        this.images = images;
        this.dir = conf.imagePath;
        const fullDirPath = path.join(this.dir, 'full');
        if (!fs.existsSync(fullDirPath)) {
            fs.mkdirSync(fullDirPath, { recursive: true });
        }
        thumbs.forEach(s => {
            const thumbsPath = path.join(this.dir, s.sizename);
            if (!fs.existsSync(thumbsPath)) {
                fs.mkdirSync(thumbsPath, { recursive: true });
            }
        });
    }
    getImageHash(file) {
        const hash = crypto_1.createHash('md5');
        hash.update(file.buffer);
        return hash.digest('base64');
    }
    saveImage(uploadedFile) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = uploadedFile.map((file) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    const metadata = yield sharp(file.buffer).metadata();
                    if (metadata.format !== 'jpeg')
                        return new Error('Must be jpeg');
                    const image = this.images.create({
                        imageName: file.originalname,
                        hash: this.getImageHash(file),
                    });
                    yield this.images.save(image);
                    const filePath = path.join(this.dir, 'full', `${image.id}.jpg`);
                    const info = yield sharp(file.buffer).toFile(filePath);
                    image.Height = info.height;
                    image.Width = info.width;
                    yield this.images.save(image);
                    yield this.saveThumbs(image, file);
                    return image;
                }
                catch (err) {
                    return Error(`
      Error when save image:
      ${err}
      `);
                }
            }));
            return yield Promise.all(result);
        });
    }
    saveThumbs(image, file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const iterator of thumbs) {
                const thumbsFilePath = path.join(this.dir, iterator.sizename, `${image.id}.jpg`);
                yield sharp(file.buffer)
                    .resize({
                    width: iterator.size,
                    height: iterator.size,
                    fit: 'inside',
                })
                    .jpeg({ quality: 50 })
                    .toFile(thumbsFilePath);
            }
        });
    }
    getImagesList() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dbImages = yield this.images.find();
            return dbImages.map((item) => {
                const hrefs = new image_dto_1.ImageHrefs();
                ['full', ...thumbs.map(item => item.sizename)].forEach(key => (hrefs[key] = {
                    href: `/images/${key}/${item.id}.jpg`,
                    size: key === 'full'
                        ? Math.max(item.Height, item.Width)
                        : thumbs.find(t => t.sizename === key).size,
                }));
                return Object.assign(new image_dto_1.ImageDto(), Object.assign(Object.assign({}, item), { hrefs }));
            });
        });
    }
    getImageById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.images.findOne({ id });
        });
    }
};
ImagesService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(entity_1.Image)),
    tslib_1.__param(1, common_1.Inject('CONFIG')),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository, Object])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map