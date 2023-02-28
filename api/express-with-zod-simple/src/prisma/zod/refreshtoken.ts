import * as z from "zod"
import { CompleteUser, RelatedUserDatabaseModel } from "./user"

export const RefreshTokenDatabaseModel = z.object({
  id: z.string(),
  expiresOn: z.date(),
  userId: z.string(),
})

export interface CompleteRefreshToken extends z.infer<typeof RefreshTokenDatabaseModel> {
  User: CompleteUser
}

/**
 * RelatedRefreshTokenDatabaseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRefreshTokenDatabaseModel: z.ZodSchema<CompleteRefreshToken> = z.lazy(() => RefreshTokenDatabaseModel.extend({
  User: RelatedUserDatabaseModel,
}))
