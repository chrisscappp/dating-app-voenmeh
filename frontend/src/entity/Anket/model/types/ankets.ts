import { EntityState } from "@reduxjs/toolkit"
import { IUser } from "entity/User"

export interface AnketsPageSchema extends EntityState<IUser, string> {
	isLoading: boolean;
	error?: string;
	isLiked?: boolean;
	isDisliked?: boolean;
	topStack?: string;
}

export interface AnketsPesponse {
	profiles?: IUser[]
}

export interface RequestAnkets {
	userId: string;
	otheruserId: string;
}