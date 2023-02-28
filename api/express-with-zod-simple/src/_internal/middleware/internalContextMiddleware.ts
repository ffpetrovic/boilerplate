import {_createMiddleware} from "../util/_createMiddleware";
import {InternalEndpoint} from "../_types";

export const internalContextMiddleware = (endpoint: InternalEndpoint) => _createMiddleware({
    handler: async (_, ctx) => {
        ctx._internal = { endpointContext: ctx ?? { } as any, request: ctx._internal.request, endpoint, outputResult: null };

        ctx._internal.request._internal = ctx._internal;

        return true;
    }
})