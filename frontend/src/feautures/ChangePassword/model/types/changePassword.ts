export interface ChangePasswordForm {
	oldPassword: string;
	newPassword: string;
}

export interface ChangePasswordSchema {
	form: ChangePasswordForm
	error?: string;
	isLoading: boolean;
}