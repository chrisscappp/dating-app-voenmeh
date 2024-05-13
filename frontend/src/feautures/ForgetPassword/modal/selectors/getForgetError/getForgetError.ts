import { StateSchema } from "app/providers/StoreProvider"

export const getForgetError = (state: StateSchema) => state.forgetPassword?.error