// tslint:disable
/**
 * rent-a-dress
 * This is API for rent-a-dress.ru service
 *
 * The version of the OpenAPI document: 1.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as globalImportUrl from 'url';
import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface CatalogItem
 */
export interface CatalogItem {
    /**
     * 
     * @type {number}
     * @memberof CatalogItem
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof CatalogItem
     */
    caption: string;
    /**
     * 
     * @type {string}
     * @memberof CatalogItem
     */
    desc: string;
    /**
     * 
     * @type {string}
     * @memberof CatalogItem
     */
    img: string;
    /**
     * 
     * @type {number}
     * @memberof CatalogItem
     */
    price: number;
    /**
     * 
     * @type {object}
     * @memberof CatalogItem
     */
    options?: object;
}
/**
 * 
 * @export
 * @interface CatalogItemOption
 */
export interface CatalogItemOption {
    /**
     * 
     * @type {number}
     * @memberof CatalogItemOption
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof CatalogItemOption
     */
    size: string;
    /**
     * 
     * @type {string}
     * @memberof CatalogItemOption
     */
    color: string;
}
/**
 * 
 * @export
 * @interface Image
 */
export interface Image {
    /**
     * 
     * @type {number}
     * @memberof Image
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof Image
     */
    imageName: string;
}
/**
 * 
 * @export
 * @interface InlineObject
 */
export interface InlineObject {
    /**
     * 
     * @type {string}
     * @memberof InlineObject
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject
     */
    password: string;
}
/**
 * 
 * @export
 * @interface InlineObject1
 */
export interface InlineObject1 {
    /**
     * 
     * @type {any}
     * @memberof InlineObject1
     */
    file?: any;
}
/**
 * 
 * @export
 * @interface InlineResponse200
 */
export interface InlineResponse200 {
    /**
     * 
     * @type {User}
     * @memberof InlineResponse200
     */
    user?: User;
}
/**
 * 
 * @export
 * @interface InlineResponse2001
 */
export interface InlineResponse2001 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001
     */
    token?: string;
}
/**
 * 
 * @export
 * @interface Token
 */
export interface Token {
    /**
     * 
     * @type {number}
     * @memberof Token
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof Token
     */
    token: string;
}
/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {number}
     * @memberof User
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    role: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    password: string;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCatalogItem(id: number, options: any = {}): RequestArgs {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteCatalogItem.');
            }
            const localVarPath = `/api/catalog/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCatalog(options: any = {}): RequestArgs {
            const localVarPath = `/api/catalog`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCatalogItem(id: number, options: any = {}): RequestArgs {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getCatalogItem.');
            }
            const localVarPath = `/api/catalog/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserByToken(options: any = {}): RequestArgs {
            const localVarPath = `/api/auth/user`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {CatalogItem} [catalogItem] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        newCatalogItem(catalogItem?: CatalogItem, options: any = {}): RequestArgs {
            const localVarPath = `/api/catalog`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};
            const needsSerialization = (typeof catalogItem !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(catalogItem !== undefined ? catalogItem : {}) : (catalogItem || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {CatalogItem} [catalogItem] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCatalogItem(catalogItem?: CatalogItem, options: any = {}): RequestArgs {
            const localVarPath = `/api/catalog`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};
            const needsSerialization = (typeof catalogItem !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(catalogItem !== undefined ? catalogItem : {}) : (catalogItem || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {any} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadImage(file?: any, options: any = {}): RequestArgs {
            const localVarPath = `/api/images/upload`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new FormData();


            if (file !== undefined) { 
                localVarFormParams.append('file', file as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {InlineObject} [inlineObject] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userLogin(inlineObject?: InlineObject, options: any = {}): RequestArgs {
            const localVarPath = `/api/auth/login`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};
            const needsSerialization = (typeof inlineObject !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(inlineObject !== undefined ? inlineObject : {}) : (inlineObject || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userLogout(options: any = {}): RequestArgs {
            const localVarPath = `/api/auth/logout`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCatalogItem(id: number, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<string> {
            const localVarAxiosArgs = DefaultApiAxiosParamCreator(configuration).deleteCatalogItem(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCatalog(options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CatalogItem>> {
            const localVarAxiosArgs = DefaultApiAxiosParamCreator(configuration).getCatalog(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCatalogItem(id: number, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<CatalogItem> {
            const localVarAxiosArgs = DefaultApiAxiosParamCreator(configuration).getCatalogItem(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserByToken(options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200> {
            const localVarAxiosArgs = DefaultApiAxiosParamCreator(configuration).getUserByToken(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {CatalogItem} [catalogItem] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        newCatalogItem(catalogItem?: CatalogItem, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<CatalogItem> {
            const localVarAxiosArgs = DefaultApiAxiosParamCreator(configuration).newCatalogItem(catalogItem, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {CatalogItem} [catalogItem] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCatalogItem(catalogItem?: CatalogItem, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<CatalogItem> {
            const localVarAxiosArgs = DefaultApiAxiosParamCreator(configuration).updateCatalogItem(catalogItem, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {any} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadImage(file?: any, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void> {
            const localVarAxiosArgs = DefaultApiAxiosParamCreator(configuration).uploadImage(file, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {InlineObject} [inlineObject] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userLogin(inlineObject?: InlineObject, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2001> {
            const localVarAxiosArgs = DefaultApiAxiosParamCreator(configuration).userLogin(inlineObject, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userLogout(options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<string> {
            const localVarAxiosArgs = DefaultApiAxiosParamCreator(configuration).userLogout(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCatalogItem(id: number, options?: any) {
            return DefaultApiFp(configuration).deleteCatalogItem(id, options)(axios, basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCatalog(options?: any) {
            return DefaultApiFp(configuration).getCatalog(options)(axios, basePath);
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCatalogItem(id: number, options?: any) {
            return DefaultApiFp(configuration).getCatalogItem(id, options)(axios, basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserByToken(options?: any) {
            return DefaultApiFp(configuration).getUserByToken(options)(axios, basePath);
        },
        /**
         * 
         * @param {CatalogItem} [catalogItem] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        newCatalogItem(catalogItem?: CatalogItem, options?: any) {
            return DefaultApiFp(configuration).newCatalogItem(catalogItem, options)(axios, basePath);
        },
        /**
         * 
         * @param {CatalogItem} [catalogItem] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCatalogItem(catalogItem?: CatalogItem, options?: any) {
            return DefaultApiFp(configuration).updateCatalogItem(catalogItem, options)(axios, basePath);
        },
        /**
         * 
         * @param {any} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadImage(file?: any, options?: any) {
            return DefaultApiFp(configuration).uploadImage(file, options)(axios, basePath);
        },
        /**
         * 
         * @param {InlineObject} [inlineObject] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userLogin(inlineObject?: InlineObject, options?: any) {
            return DefaultApiFp(configuration).userLogin(inlineObject, options)(axios, basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userLogout(options?: any) {
            return DefaultApiFp(configuration).userLogout(options)(axios, basePath);
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public deleteCatalogItem(id: number, options?: any) {
        return DefaultApiFp(this.configuration).deleteCatalogItem(id, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getCatalog(options?: any) {
        return DefaultApiFp(this.configuration).getCatalog(options)(this.axios, this.basePath);
    }

    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getCatalogItem(id: number, options?: any) {
        return DefaultApiFp(this.configuration).getCatalogItem(id, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getUserByToken(options?: any) {
        return DefaultApiFp(this.configuration).getUserByToken(options)(this.axios, this.basePath);
    }

    /**
     * 
     * @param {CatalogItem} [catalogItem] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public newCatalogItem(catalogItem?: CatalogItem, options?: any) {
        return DefaultApiFp(this.configuration).newCatalogItem(catalogItem, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @param {CatalogItem} [catalogItem] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public updateCatalogItem(catalogItem?: CatalogItem, options?: any) {
        return DefaultApiFp(this.configuration).updateCatalogItem(catalogItem, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @param {any} [file] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public uploadImage(file?: any, options?: any) {
        return DefaultApiFp(this.configuration).uploadImage(file, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @param {InlineObject} [inlineObject] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public userLogin(inlineObject?: InlineObject, options?: any) {
        return DefaultApiFp(this.configuration).userLogin(inlineObject, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public userLogout(options?: any) {
        return DefaultApiFp(this.configuration).userLogout(options)(this.axios, this.basePath);
    }

}


