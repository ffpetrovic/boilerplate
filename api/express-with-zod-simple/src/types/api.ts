import {InternalEndpoint, InternalMiddleware} from "../_internal/_types";
import {prisma} from "../prisma/prisma";
import {UserDatabaseModel} from "../prisma/zod";
import {z} from "zod";

export type Context = {
    db: typeof prisma;
    user: z.infer<typeof UserDatabaseModel>;
}

export type Middleware = InternalMiddleware<Context>;

export type Endpoint<InputType extends z.ZodType = z.ZodType, OutputType extends z.ZodType = z.ZodType> = InternalEndpoint<Context, InputType, OutputType> & {
    public?: boolean;
}