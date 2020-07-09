"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_provider_1 = require("./config.provider");
let ConfigModule = class ConfigModule {
};
ConfigModule = tslib_1.__decorate([
    common_1.Module({ providers: [config_provider_1.ConfigProvider], exports: ['CONFIG'] })
], ConfigModule);
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=config.module.js.map