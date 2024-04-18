export interface ChangePasswordForm {
	password: string;
}

export interface ChangePasswordSchema {
	form: ChangePasswordForm
	error?: string;
	isLoading: boolean;
}