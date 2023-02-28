import {prisma} from "../prisma/prisma";
import {createMiddleware} from "../util/createMiddleware";
import {Context} from "../types/api";

export const createContextMiddleware = createMiddleware({
    handler: async (_, ctx) => {
        const endpointContext: Context = {
            db: prisma,
            user: null,
        }

        ctx._internal = {
            ...ctx._internal,
            outputResult: null,
            endpointContext: {
                ...endpointContext,
                _internal: ctx._internal,
            }
        }

        ctx._internal.request._internal = ctx._internal;

        return true;
    }
})
