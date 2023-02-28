import {InternalEndpoint, InternalRequestHandler} from "../_types";
import {getRequestParams} from "./getRequestParams";
import * as createHttpError from "http-errors";
import {throwErrorOnResponse} from "./throwErrorOnResponse";

export const endpointExecutorCallback = (endpoint: InternalEndpoint<any>): InternalRequestHandler<any> => (async (req, res, next) => {
    try {
        const handlerResult = await endpoint.handler(getRequestParams(req), req._internal.endpointContext);
        const parsedHandlerResult = endpoint.output.parse(handlerResult);

        req._internal.outputResult = parsedHandlerResult;
        req._internal.endpointContext._internal.outputResult = parsedHandlerResult;

        next();
    } catch (error) {
        throwErrorOnResponse(res, createHttpError.InternalServerError('Internal Server Error'))

        console.error(error)
    }
})