import {BuildProcedure, inferAsyncReturnType} from "@trpc/server";
import { initTRPC } from '@trpc/server';
import * as trpcNext from "@trpc/server/adapters/next";
import {z} from "zod";
import {OpenApiMeta} from "trpc-openapi";
import {prisma} from "./prisma";
import {router as appRouter} from "../index";

export const t = initTRPC.meta<OpenApiMeta>().context<Context>().create();
export const publicProcedure = t.procedure;

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
    return {
        req: opts.req,
        db: prisma
    };
}

export type Context = inferAsyncReturnType<typeof createContext>;
export const addOpenApiMetaToRouter = (router: typeof appRouter) => {
    Object.entries(router._def.procedures).forEach(([procedureName, procedure]) => {
        if(!procedure._def.query && !procedure._def.mutation) return;

        (procedure as BuildProcedure<any, any, any>)._def.meta = {
            openapi: {
                method: procedure._def.mutation ? "POST" : "GET",
                enabled: true,
                path: `/${procedureName}`
            }
        }
    })
}

type ProcedureHandlerArgs<InputType extends z.ZodType> = {
    ctx: Context;
    input: InputType;
}

type CreateProcedureProps<InputType extends z.ZodType, OutputType extends z.ZodType> = {
    input: InputType,
    output: OutputType,
    handler: (arg: ProcedureHandlerArgs<z.infer<InputType>>) => Promise<z.infer<OutputType>>
}

export const createProcedure = <InputType extends z.ZodType, OutputType extends z.ZodType>(type: 'query' | 'mutation', { input, output, handler }: CreateProcedureProps<InputType, OutputType>) => {
    return {
        procedure: publicProcedure.input(input).output(output)[type](handler),
        handler,
        input,
        output,
    };
}
