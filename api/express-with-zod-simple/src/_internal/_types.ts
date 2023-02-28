import {z} from "zod";
import {RequestHandler} from "express";
import * as express from "express";

export type InternalRequest<TContext> = Parameters<RequestHandler>[0] & { _internal: InternalRequestContext<TContext>['_internal'] };

export type InternalRequestContext<TContext> = {
    _internal: {
        endpoint: InternalEndpoint<TContext>;
        request: InternalRequest<TContext>;
        outputResult: any;
        endpointContext: InternalEndpointContext<TContext>
    }
}

export type InternalEndpointContext<TContext = {}> = TContext & {
    _internal: InternalRequestContext<TContext>['_internal'];
}

export type InternalRequestHandler<
    TContext
> = (
    req: InternalRequest<TContext>,
     res: Parameters<RequestHandler>[1],
     next: Parameters<RequestHandler>[2],
) => ReturnType<RequestHandler>;

export type InternalMiddleware<TContext = {}> = Pick<InternalEndpoint<TContext, z.ZodNull, z.ZodBoolean>, 'handler' | 'input' | 'output'>;

export type InternalEndpoint<TContext = {}, InputType extends z.ZodType = z.ZodType, OutputType extends z.ZodType = z.ZodType> = {
    _meta?: {
        auth?: boolean;
    };
    type: 'query' | 'mutation';
    input: InputType;
    output: OutputType,
    preMiddlewares?: Array<InternalMiddleware>;
    postMiddlewares?: Array<InternalMiddleware>;
    handler: (input: z.infer<InputType>, ctx: InternalEndpointContext<TContext>) => Promise<z.infer<OutputType>>;
}

// @todo do this better, infer from original express types
export type InternalExtendedExpressApplication = Omit<express.Application, 'get' | 'post'> & {
    get: (path: string, ...requestHandlers: InternalRequestHandler<any>[]) => any,
    post: (path: string, ...requestHandlers: InternalRequestHandler<any>[]) => any,
}
