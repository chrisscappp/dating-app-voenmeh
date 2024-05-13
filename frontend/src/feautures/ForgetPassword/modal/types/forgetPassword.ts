export interface ForgetPasswordSchema {
	isLoading: boolean;
	error?: string;
	email?: string;
	message?: string;
}

export interface ForgetForm {
	email?: string;
}

export enum ValidateErrors {
	EMPTY_EMAIL = "empty_email"
}