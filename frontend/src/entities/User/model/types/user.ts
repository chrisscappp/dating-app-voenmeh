export interface IUser {
	id: string,
	username?: string,
	email?: string
}

export interface UserSchema {
	authData?: IUser

	_inited: boolean;
}