import { StateSchema } from "app/providers/StoreProvider"

export const getDeleteAccountError = (state: StateSchema) => state.deleteAccount?.error