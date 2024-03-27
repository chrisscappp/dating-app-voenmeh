export interface RegisterForm {
	firstname?: string;
	lastname?: string;
	username?: string;
	email?: string;
	password?: string;
	repeatPassword?: string;
	birthday?: string;
	sex?: string;
	validateErrors?: string;
	checkBoxFlag?: boolean;
}

export interface RegisterSchema {
	formData?: RegisterForm,
	isLoading: boolean;
	error?: string;
}