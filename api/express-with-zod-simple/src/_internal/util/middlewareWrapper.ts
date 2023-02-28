import {InternalRequestHandler, InternalMiddleware} from "../_types";
import * as createHttpError from "http-errors";
import {throwErrorOnResponse} from "./throwErrorOnResponse";

export const middlewareWrapper = <TContext = {}>(middleware: InternalMiddleware<TContext>): InternalRequestHandler<TContext> => {
    return async (req, res, next) => {
        try {
            req._internal =
                req._internal ??
                {
                    endpointContext: {
                        _internal: {
                            request: req,
                        }
                    },
                    request: req,
                } as any;

            const middlewareResult = await middleware.handler(null, req._internal.endpointContext);

            if (middlewareResult) {
                return next()
            } else {
                console.error('no middleware result')

                return throwErrorOnResponse(res, createHttpError.InternalServerError('Internal Server Error'))
            }
        } catch (e) {
            if (e instanceof createHttpError.HttpError) {
                return throwErrorOnResponse(res, e);
            } else {
                console.error('middleware wrapper error', e)

                return throwErrorOnResponse(res, createHttpError.InternalServerError('Internal Server Error'));
            }
        }
    }
}