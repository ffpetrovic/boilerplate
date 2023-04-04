import {z} from "zod";
import {createProcedure} from "../utils/trpc";

export const testProcedure = createProcedure('query', {
    input: z.object({}),
    output: z.string(),
    handler: async ({ ctx }) => {
        return 'test';
    }
})
