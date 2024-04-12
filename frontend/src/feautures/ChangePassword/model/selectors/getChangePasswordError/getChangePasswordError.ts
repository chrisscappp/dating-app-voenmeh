import { StateSchema } from "app/providers/StoreProvider"

export const getChangePasswordError = (state: StateSchema) => state.changePassword?.error