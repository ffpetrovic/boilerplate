import {_createMiddleware} from "../util/_createMiddleware";
import * as createHttpError from "http-errors";

export const internalServerErrorMiddleware = _createMiddleware({
    handler: async (_, ctx) => {
        if (ctx._internal.outputResult) return true;


        console.error('No endpoint result')
        throw createHttpError.InternalServerError('Internal Server Error');
    }
})