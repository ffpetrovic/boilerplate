import {UserDatabaseModel} from "../prisma/zod";
import {registry} from "../_internal/util/registry";

export const UserResponseModel = registry.register('UserResponseModel', UserDatabaseModel.pick({
    id: true,
    name: true,
}))
