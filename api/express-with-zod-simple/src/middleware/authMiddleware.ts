import {createMiddleware} from "../util/createMiddleware";
import * as createHttpError from "http-errors";

export const authMiddleware = createMiddleware({
    handler: async (_, ctx) => {
        if(ctx._internal.request.headers.authorization === 'Bearer testAuthToken123') return true;

        throw createHttpError.Unauthorized('unauthorized');
    }
})
