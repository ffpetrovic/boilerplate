import * as z from "zod"
import { CompleteRefreshToken, RelatedRefreshTokenDatabaseModel } from "./index"

export const UserDatabaseModel = z.object({
  id: z.string(),
  remoteUserId: z.string(),
  name: z.string(),
  createdAt: z.date(),
  lastChangedAt: z.date(),
  nameLastChangedAt: z.date().nullish(),
  bannedTo: z.date().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserDatabaseModel> {
  RefreshToken: CompleteRefreshToken[]
}

/**
 * RelatedUserDatabaseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserDatabaseModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserDatabaseModel.extend({
  RefreshToken: RelatedRefreshTokenDatabaseModel.array(),
}))
