import {z} from "zod";
import {createProcedure} from "../utils/trpc";
import {UserModel} from "../prisma/zod";

const { procedure, handler, input, output } = createProcedure('query', {
    input: z.never(),
    output: z.array(UserModel),
    handler: async ({ ctx }) => {
        return ctx.db.user.findMany();
    }
})

export const getUsers = { procedure, handler, input, output }