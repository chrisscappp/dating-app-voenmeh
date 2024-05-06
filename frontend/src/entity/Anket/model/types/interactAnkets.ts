import { EntityState } from "@reduxjs/toolkit"
import { IUser } from "entity/User"

export interface InteractAnketsSchema extends EntityState<IUser, string> {
	isLoading: boolean;
	error?: string;
	isLiked?: boolean;
	isDisliked?: boolean;
	topStack?: string;
	likedAnket?: IUser;
}

export interface AnketsPesponse {
	profiles?: IUser[]
}

export interface RequestAnkets {
	userId: string;
	otheruserId: string;
	sympathy?: boolean;
}