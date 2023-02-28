import {_createEndpoint} from "../_internal/util/_createEndpoint";
import {Context, Endpoint} from "../types/api";
import {authMiddleware} from "../middleware/authMiddleware";
import {inputValidationMiddleware} from "../_internal/middleware/inputValidation";
import {createContextMiddleware} from "../middleware/createContextMiddleware";
import {z} from "zod";
import {InternalEndpoint, InternalMiddleware} from "../_internal/_types";

export const createEndpoint = <InputType extends z.ZodType = z.ZodType, OutputType extends z.ZodType = z.ZodType>(endpoint: Endpoint<InputType, OutputType>): InternalEndpoint<Context, InputType, OutputType> => {
    const preMiddlewares: Array<InternalMiddleware<any>> = [
        createContextMiddleware,
        !endpoint.public && authMiddleware,
        inputValidationMiddleware,
    ].filter(e => !!e);

    const postMiddlewares: Array<InternalMiddleware<any>> = []

    return _createEndpoint<Context, InputType, OutputType>({
        preMiddlewares,
        postMiddlewares,
        type: endpoint.type,
        input: endpoint.input,
        output: endpoint.output,
        handler: endpoint.handler,
        _meta: {
            auth: !endpoint.public,
        }
    });
};