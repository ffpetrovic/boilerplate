import {z} from "zod";
import {createProcedure} from "../utils/trpc";

const { procedure, handler, input, output } = createProcedure('query', {
    input: z.object({ id: z.string() }),
    output: z.object({ id: z.string(), name: z.string() }),
    handler: async ({ ctx, input: { id } }) => {
        return {
            id,
            name: 'Test Name',
        }
    }
})

export const getUser = { procedure, handler, input, output }