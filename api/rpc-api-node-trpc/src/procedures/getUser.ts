import {z} from "zod";
import {createProcedure} from "../utils/trpc";
import {testProcedure} from "./testProcedure";
import {models} from "../utils/models";

export const getUser = createProcedure('query', {
    input: z.object({ }),
    output: z.object({ user: models.UserResponseModel.nullable(), test: testProcedure.output }),
    handler: async ({ ctx }) => ({
        user: await ctx.db.user.findFirst(),
        test: await testProcedure.handler({ ctx, input: {} })
    })
})
