export interface IUser {
	userId: string,
	avatar?: string;
    firstname?: string;
    lastname?: string;
    about?: string;
    confirm?: boolean;
    age?: number;
	email?: string;
    login?: string;
}

export interface UserSchema {
	authData?: IUser

	_inited: boolean;
}