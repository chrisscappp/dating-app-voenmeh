export interface DeleteAccountForm {
	password: string;
	repeatPassword: string;
}

export interface DeleteAccountSchema {
	form: DeleteAccountForm;
	error?: string;
	isLoading?: boolean;
}