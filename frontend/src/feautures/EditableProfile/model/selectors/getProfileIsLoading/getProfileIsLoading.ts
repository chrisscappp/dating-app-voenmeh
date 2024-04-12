import { StateSchema } from "app/providers/StoreProvider"

export const getProfileIsLoading = (state: StateSchema) => state.editableProfile?.isLoading 