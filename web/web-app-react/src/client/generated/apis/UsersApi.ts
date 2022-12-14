/* tslint:disable */
/* eslint-disable */
/**
 * boilerplate_api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  User,
} from '../models';
import {
    UserFromJSON,
    UserToJSON,
} from '../models';

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     */
    async userControllerCreateUserRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async userControllerCreateUser(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.userControllerCreateUserRaw(initOverrides);
    }

    /**
     */
    async userControllerGetLatestUserRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/latest`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async userControllerGetLatestUser(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.userControllerGetLatestUserRaw(initOverrides);
        return await response.value();
    }

}
