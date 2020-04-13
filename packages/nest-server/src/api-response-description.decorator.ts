import { ApiResponseMetadata } from '@nestjs/swagger';

export const ApiResponseDescription = (
  statusCode: string,
  description: string,
): MethodDecorator => {
  const decoratorFactory = (target: object, key?: any, descriptor?: any) => {
    const responses =
      Reflect.getMetadata('swagger/apiResponse', descriptor.value) || {};
    const response: ApiResponseMetadata = responses[statusCode] || {};

    response.description = response.description || description;
    Reflect.defineMetadata('swagger/apiResponse', responses, descriptor.value);

    return descriptor;
  };
  decoratorFactory.KEY = 'swagger/apiResponse';
  return decoratorFactory;
};
