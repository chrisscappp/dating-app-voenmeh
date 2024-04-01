export interface LoginSchema {
	password: string,
	username?: string,
	email?: string,
	isLoading: boolean,
	error?: string,
	validateErrors?: string[]
}