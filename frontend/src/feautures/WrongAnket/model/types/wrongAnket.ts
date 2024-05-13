export interface WrongAnketSchema {
	isLoading: boolean;
	error?: string;
	message?: string;
}

export interface WrongRequest {
	sender: string;
	message: string;
	wrongAnket: string;
}