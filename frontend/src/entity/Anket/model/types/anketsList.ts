import { EntityState } from "@reduxjs/toolkit"
import { Contact } from "entity/ProfileCard"
import { IUser } from "entity/User"

export interface AnketsListSchema extends EntityState<IUser, string> {
	isLoading: boolean;
	error?: string;
	contacts?: Contact;
}

export interface AnketsPesponse {
	profiles?: IUser[]
}

export interface RequestAnkets {
	userId: string;
	otheruserId: string;
}