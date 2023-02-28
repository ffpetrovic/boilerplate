import * as z from "zod"
import { CompleteUser, RelatedUserDatabaseModel } from "./index"

export const PostDatabaseModel = z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
})

export interface CompletePost extends z.infer<typeof PostDatabaseModel> {
  user: CompleteUser
}

/**
 * RelatedPostDatabaseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostDatabaseModel: z.ZodSchema<CompletePost> = z.lazy(() => PostDatabaseModel.extend({
  user: RelatedUserDatabaseModel,
}))
