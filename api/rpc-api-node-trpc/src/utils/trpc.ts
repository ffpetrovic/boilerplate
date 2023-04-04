import {inferAsyncReturnType, Procedure} from "@trpc/server";
import { initTRPC } from '@trpc/server';
import * as trpcNext from "@trpc/server/adapters/next";
import {z} from "zod";
import {OpenApiMeta} from "trpc-openapi";
import {prisma} from "./prisma";
import {router as appRouter} from "../index";
import {extendZodWithOpenApi, OpenAPIGenerator, OpenAPIRegistry} from "@asteasolutions/zod-to-openapi";
import * as pkg from '../../package.json';

export const registry = new OpenAPIRegistry();

extendZodWithOpenApi(z)

export const t = initTRPC.meta<OpenApiMeta>().context<Context>().create();
export const publicProcedure = t.procedure;

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
    return {
        req: opts.req,
        db: prisma
    };
}

export type Context = inferAsyncReturnType<typeof createContext>;

/*
 * We override the logic implemented by `trpc-openapi`
 * because it generates a flat OpenAPI spec, not
 * a referential one.
 */
export const generateOpenAPIDocument = (router: typeof appRouter) => {
    Object.entries(router._def.procedures).forEach(([procedureName, _procedure]) => {
        const procedure = _procedure as Procedure<any, any>;

        const inputModel = registry.register(`${procedureName[0]!.toUpperCase()}${procedureName.substring(1)}Request`, procedure._def.inputs[0] as any);
        const outputModel = registry.register(`${procedureName[0]!.toUpperCase()}${procedureName.substring(1)}Response`, procedure._def.output as any);
        const method = procedure._def.mutation ? 'post' : 'get';

        procedure._def.inputs[0] = inputModel;
        procedure._def.output = outputModel;

        procedure._def.meta = {
            openapi: {
                method: procedure._def.mutation ? "POST" : "GET",
                enabled: true,
                path: `/${procedureName}`
            }
        }

        const registerPathParam: Parameters<typeof registry.registerPath>[0] = {
            path: `/${procedureName}`,
            method,
            responses: {
                200: {
                    description: "",
                    content: {
                        'application/json': {
                            schema: outputModel,
                        },
                    }
                }
            }
        }

        if (method === 'get') {
            registerPathParam['request'] = {
                query: inputModel,
            }
        } else {
            registerPathParam.request = {
                body: {
                    description: `${procedureName} endpoint request body model`,
                    content: {
                        'application/json': {
                            schema: inputModel,
                        }
                    }
                }
            }
        }

        // @todo protected routes

        registry.registerPath(registerPathParam);
    })

    const generator = new OpenAPIGenerator(registry.definitions, '3.0.0');
    return generator.generateDocument({
        info: {
            title: pkg.name,
            version: pkg.version,
            description: pkg.description,
        },
        servers: [{url: `http://localhost:${process.env.PORT}/api`}],
    });
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
        type,
    };
}
