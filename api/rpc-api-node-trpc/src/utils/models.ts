import {UserDatabaseModel} from "../prisma/zod";
import * as zodModels from '../prisma/zod'
import {extendZodWithOpenApi} from "@asteasolutions/zod-to-openapi";
import {z} from "zod";
import {registry} from "./trpc";

extendZodWithOpenApi(z);

const _modelsMap = {
    ...zodModels,
    UserResponseModel: UserDatabaseModel.pick({
        id: true,
        firstName: true,
    }),
}

export const models = Object.fromEntries(Object.entries(_modelsMap).map(([modelName, model]) => {
    if(modelName.endsWith('DatabaseModel')) return [modelName, model]; // don't expose database models to OpenAPI

    return [modelName, registry.register(modelName, model)];
})) as unknown as typeof _modelsMap;
