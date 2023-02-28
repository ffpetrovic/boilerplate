import {_createMiddleware} from "../util/_createMiddleware";
import * as createHttpError from "http-errors";
import {getRequestMethodFromEndpoint} from "../util/getRequestMethodFromEndpoint";
import {InternalEndpoint} from "../_types";

export const notFoundMiddleware = (endpoints: Record<string, InternalEndpoint>) => _createMiddleware({
    handler: async (_, ctx) => {
        const foundEndpoint = Object.entries(endpoints).find(([endpointName, endpoint]) => {
            return ctx._internal.request.method.toLowerCase() === getRequestMethodFromEndpoint(endpoint) && ctx._internal.request.path === `/${endpointName}`
        })

        if (!foundEndpoint) throw createHttpError.NotFound('Not Found');

        return true;
    }
})
