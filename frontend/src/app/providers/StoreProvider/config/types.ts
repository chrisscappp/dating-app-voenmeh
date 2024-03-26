import { AnyAction, ReducersMapObject, Reducer  } from "@reduxjs/toolkit"
import { AxiosInstance } from "axios";
import { UserSchema } from "entities/User";
import { LoginSchema } from "feautures/Login";

export interface StateSchema {
	user: UserSchema,
	
	//async
	loginForm?: LoginSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManagerType {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => any;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager {
	reducerManager: ReducerManagerType
}

export interface ExtraArgumentType {
	api: AxiosInstance
}

export interface ThunkConfig<T> {
	rejectValue: T,
	state: StateSchema,
	extra: ExtraArgumentType
}
