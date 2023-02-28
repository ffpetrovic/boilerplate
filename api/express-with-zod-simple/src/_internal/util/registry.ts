import {extendZodWithOpenApi, OpenAPIRegistry} from "@asteasolutions/zod-to-openapi";
import {z} from "zod";

export const registry = new OpenAPIRegistry();
extendZodWithOpenApi(z);