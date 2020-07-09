"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../auth/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const images_service_1 = require("./images.service");
const swagger_1 = require("@nestjs/swagger");
const file_upload_dto_1 = require("./file-upload.dto");
const entity_1 = require("./../entity");
const multipart_request_guard_1 = require("./multipart-request.guard");
const exception_filter_1 = require("../exception.filter");
const image_dto_1 = require("./image.dto");
const path = require("path");
const fs = require("fs");
let ImagesController = class ImagesController {
    constructor(service, conf) {
        this.service = service;
        this.conf = conf;
    }
    upload(file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.service.saveImage(file);
        });
    }
    getImagesList() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.service.getImagesList();
        });
    }
    getImage(stringId, size, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = Number.parseInt(stringId);
            const image = yield this.service.getImageById(id);
            if (!image)
                throw new common_1.NotFoundException('DB record not found');
            const imagePath = path.join(this.conf.imagePath, size, `${image.id}.jpg`);
            const exists = yield new Promise(resolve => {
                fs.exists(imagePath, resolve);
            });
            if (exists)
                return res.sendFile(imagePath);
            throw new common_1.NotFoundException('File not found');
        });
    }
};
tslib_1.__decorate([
    common_1.Post('upload'),
    common_1.UseGuards(multipart_request_guard_1.MultipartRequestGuard),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiBody({
        description: 'List of uploaded images',
        type: file_upload_dto_1.FileUploadDto,
    }),
    swagger_1.ApiCreatedResponse({
        description: 'Server image descripions',
        isArray: true,
        type: entity_1.Image,
    }),
    swagger_1.ApiBadRequestResponse({
        description: 'Return if incorrect content type recieved',
        type: exception_filter_1.ExceptionResponse,
    }),
    tslib_1.__param(0, common_1.UploadedFiles()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], ImagesController.prototype, "upload", null);
tslib_1.__decorate([
    common_1.Get(),
    swagger_1.ApiOkResponse({
        description: 'Return all images from DB',
        isArray: true,
        type: image_dto_1.ImageDto,
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ImagesController.prototype, "getImagesList", null);
tslib_1.__decorate([
    swagger_1.ApiNotFoundResponse({ description: 'Image not found on disk or in the DB' }),
    swagger_1.ApiOkResponse({ description: 'Return an image' }),
    common_1.Get(':size(full|big|medium|small)/:id(\\d+).jpg'),
    tslib_1.__param(0, common_1.Param('id')),
    tslib_1.__param(1, common_1.Param('size')),
    tslib_1.__param(2, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImagesController.prototype, "getImage", null);
ImagesController = tslib_1.__decorate([
    common_1.Controller('images'),
    common_1.UseGuards(roles_guard_1.RoleGuard),
    tslib_1.__param(1, common_1.Inject('CONFIG')),
    tslib_1.__metadata("design:paramtypes", [images_service_1.ImagesService, Object])
], ImagesController);
exports.ImagesController = ImagesController;
//# sourceMappingURL=images.controller.js.map