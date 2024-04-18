export interface IUser {
	userId: string,
	idToken: string
}

export interface UserSchema {
	authData?: IUser

	_inited: boolean;
}