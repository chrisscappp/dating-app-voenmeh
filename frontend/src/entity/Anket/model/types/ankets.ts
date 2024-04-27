import { IUser } from "entity/User"

export interface AnketsPageSchema {
	isLoading: boolean;
	error?: string;
	users?: IUser[]
}

export interface AnketsPesponse {
	profiles?: IUser[]
}