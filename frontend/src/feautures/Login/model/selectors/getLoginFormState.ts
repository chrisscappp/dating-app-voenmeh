import { StateSchema } from "app/providers/StoreProvider"

export const getLoginFormState = (state: StateSchema) => state?.loginForm
export const getLoginFormUsername = (state: StateSchema) => state?.loginForm?.username
export const getLoginFormEmail = (state: StateSchema) => state?.loginForm?.email
export const getLoginFormPassword = (state: StateSchema) => state?.loginForm?.password
export const getLoginFormError = (state: StateSchema) => state?.loginForm?.error
export const getLoginFormIsLoading = (state: StateSchema) => state?.loginForm?.isLoading
export const getLoginFormValidateErrors = (state: StateSchema) => state?.loginForm?.validateErrors