import { EntityState } from "@reduxjs/toolkit"
import { IUser } from "entity/User"

export interface LikedAnketsSchema extends EntityState<IUser, string> {
	isLoading: boolean;
	error?: string;
}

export interface AnketsPesponse {
	profiles?: IUser[]
}

export interface RequestAnkets {
	userId: string;
	otheruserId: string;
}