import {_createMiddleware} from "../util/_createMiddleware";
import * as createHttpError from "http-errors";
import {getRequestParams} from "../util/getRequestParams";

export const inputValidationMiddleware = _createMiddleware({
    handler: async (_, ctx) => {
        try {
            ctx._internal.endpoint.input.parse(getRequestParams(ctx._internal.request))
        } catch (e) {
            throw createHttpError.BadRequest('Input validation error')
        }

        return true;
    }
})