import {InternalMiddleware} from "../_types";
import {z} from "zod";

export const _createMiddleware = <TContext>(middleware: Pick<InternalMiddleware<TContext>, 'handler'>): InternalMiddleware<TContext> => ({
    ...middleware,
    input: z.null(),
    output: z.boolean(),
});
