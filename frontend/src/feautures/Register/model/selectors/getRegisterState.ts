import { StateSchema } from "app/providers/StoreProvider"

export const getRegisterFormState = (state: StateSchema) => state?.registerForm?.formData
export const getRegisterFormLogin = (state: StateSchema) => state?.registerForm?.formData?.login
export const getRegisterFormSex = (state: StateSchema) => state?.registerForm?.formData?.sex
export const getRegisterFormFirstname = (state: StateSchema) => state?.registerForm?.formData?.firstname
export const getRegisterFormLastname = (state: StateSchema) => state?.registerForm?.formData?.lastname
export const getRegisterFormBirthday = (state: StateSchema) => state?.registerForm?.formData?.birthday
export const getRegisterFormEmail = (state: StateSchema) => state?.registerForm?.formData?.email
export const getRegisterFormPassword = (state: StateSchema) => state?.registerForm?.formData?.password
export const getRegisterFormRepeatPassword = (state: StateSchema) => state?.registerForm?.formData?.repeatPassword
export const getRegisterFormError = (state: StateSchema) => state?.registerForm?.error
export const getRegisterFormIsLoading = (state: StateSchema) => state?.registerForm?.isLoading
export const getRegisterFormValidateErrors = (state: StateSchema) => state?.registerForm?.validateErrors
export const getRegisterFormCheckBoxFlag = (state: StateSchema) => state?.registerForm?.formData?.checkBoxFlag