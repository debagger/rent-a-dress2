"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseDescription = (statusCode, description) => {
    const decoratorFactory = (target, key, descriptor) => {
        const responses = Reflect.getMetadata('swagger/apiResponse', descriptor.value) || {};
        const response = responses[statusCode] || {};
        response.description = response.description || description;
        Reflect.defineMetadata('swagger/apiResponse', responses, descriptor.value);
        return descriptor;
    };
    decoratorFactory.KEY = 'swagger/apiResponse';
    return decoratorFactory;
};
//# sourceMappingURL=api-response-description.decorator.js.map