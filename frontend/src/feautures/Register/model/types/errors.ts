export enum FormErrorType {
	INVALID_DATA = "INVALID_DATA",
	TURN_CHECKBOX = "TURN_CHECKBOX",
	INCORRECT_BIRTHDAY = "INCORRECT_BIRTHDAY",
	INCORRECT_EMAIL = "INCORRECT_EMAIL",
	REPEAT_PASSWORD = "REPEAT_PASSWORD",
	EMPTY_FORM = "EMPTY_FORM",
	SERVER_ERROR = "SERVER_ERROR",
	EMAIL_ALREADY = "Email already exists",
	LOGIN_ALREADY = "Login already exists",
	PASSWORD_INVALID = "Week password",
}

export interface Error {
	message: string;
	key?: FormErrorType
}

export type ValidateErrorObj = Partial<Record<FormErrorType, Error>>