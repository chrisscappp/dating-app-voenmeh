import { ForgetForm, ValidateErrors } from "../../types/forgetPassword"

export function validateForgetForm(form: ForgetForm) {
	const errors: ValidateErrors[] = []

	if (!form.email) {
		errors.push(ValidateErrors.EMPTY_EMAIL)
	}

	return errors
}