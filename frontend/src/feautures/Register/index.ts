export {
	registerFormActions,
	registerFormReducer
} from "./model/slice/registerSlice"

export {
	RegisterSchema
} from "./model/types/register"

export {
	getRegisterFormBirthday,
	getRegisterFormEmail,
	getRegisterFormError,
	getRegisterFormFirstname,
	getRegisterFormIsLoading,
	getRegisterFormLastname,
	getRegisterFormPassword,
	getRegisterFormSex,
	getRegisterFormState,
	getRegisterFormLogin,
	getRegisterFormValidateErrors
} from "./model/selectors/getRegisterState"

export {
	RegisterModal
} from "./ui/RegisterModal/RegisterModal"