import {z} from "zod";
import {UserResponseModel} from "../models";
import {createEndpoint} from "../util/createEndpoint";
import {simpleEndpoint} from "./simpleEndpoint";

export const getUsers = createEndpoint({
    type: 'query',
    input: z.object({}),
    output: z.object({
        users: z.array(UserResponseModel),
        fromHelloEndpoint: simpleEndpoint.output,
    }),
    handler: async (_, ctx) => {
        const { db } = ctx;

        return {
            users: await db.user.findMany(),
            fromHelloEndpoint: await simpleEndpoint.handler({ name: 'getUsers endpoint name' }, ctx)
        };
    }
})
