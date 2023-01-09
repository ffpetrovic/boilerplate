import {z} from "zod";
import {createProcedure} from "../utils/trpc";
import {getUser} from "./getUser";

const { procedure, handler, input, output } = createProcedure('query', {
    input: z.never(),
    output: getUser.output,
    handler: async ({ ctx, input: { id } }) => {
        return getUser.handler({ ctx, input: { id: '123' } })
    }
})

export const getLatestUser = { procedure, handler, input, output }