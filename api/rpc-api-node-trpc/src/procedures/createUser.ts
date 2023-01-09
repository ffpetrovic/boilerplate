import {z} from "zod";
import {createProcedure} from "../utils/trpc";

const { procedure, handler, input, output } = createProcedure('mutation', {
    input: z.object({ firstName: z.string(), lastName: z.string() }),
    output: z.void(),
    handler: async ({ ctx, input: { firstName, lastName } }) => {
        await ctx.db.user.create({
            data: {
                firstName,
                lastName,
                isActive: true,
            }
        })
    }
})

export const createUser = { procedure, handler, input, output }