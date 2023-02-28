import {z} from "zod";
import {createEndpoint} from "../util/createEndpoint";

export const simpleEndpoint = createEndpoint({
    type: 'query',
    public: true,
    input: z.object({
        name: z.string(),
    }),
    output: z.object({
        greeting: z.string(),
    }),
    handler: async ({ name }) => {
        return {
            greeting: `hello ${name}!`,
        }
    }
})
