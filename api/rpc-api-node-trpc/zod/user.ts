import * as z from "zod"

export const UserDatabaseModel = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  isActive: z.boolean(),
})
