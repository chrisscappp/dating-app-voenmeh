import { FormErrorType } from "../types/errors"
import { RegisterForm } from "../types/register"

export function validateForm(form: RegisterForm) {

	if (!form) {
		return [FormErrorType.EMPTY_FORM]
	}

	const errors: FormErrorType[] = []
	
	const {
		birthday,
		checkBoxFlag,
		email,
		firstname,
		lastname,
		password,
		repeatPassword,
		sex,
		login
	} = form

	if (!login || !birthday || !firstname || !lastname || !password || !sex || !repeatPassword || !email) {
		errors.push(FormErrorType.INVALID_DATA)
	}

	if (birthday && !/^[0-3]?[0-9]\.[01]?[0-9]\.[12][90][0-9][0-9]$/.test(birthday)) {
		errors.push(FormErrorType.INCORRECT_BIRTHDAY)
	}

	if (repeatPassword !== password) {
		errors.push(FormErrorType.REPEAT_PASSWORD)
	}

	if (!checkBoxFlag) {
		errors.push(FormErrorType.TURN_CHECKBOX)
	}
	
	if (email && !(/\S+@\S+\.\S+/.test(email))) {
		errors.push(FormErrorType.INCORRECT_EMAIL)
	}

	return errors
}