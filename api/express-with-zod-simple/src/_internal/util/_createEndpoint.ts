import {z} from "zod";
import {InternalEndpoint} from "../_types";

export const _createEndpoint =
    <TContext, InputType extends z.ZodType = z.ZodType, OutputType extends z.ZodType = z.ZodType>
    (endpoint: InternalEndpoint<TContext, InputType, OutputType>) => endpoint;
