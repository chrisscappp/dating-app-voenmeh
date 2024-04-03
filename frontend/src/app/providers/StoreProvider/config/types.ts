import { AnyAction, ReducersMapObject, Reducer  } from "@reduxjs/toolkit"
import { AxiosInstance } from "axios"
import { UserSchema } from "entities/User"
import { LoginSchema } from "feautures/Login"
import { RegisterSchema } from "feautures/Register"
import { NavigateFunction } from "react-router"

export interface StateSchema {
	user: UserSchema,

	//async
	loginForm?: LoginSchema,
	registerForm?: RegisterSchema,
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManagerType {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	reduce: (state: StateSchema, action: AnyAction) => any;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager {
	reducerManager: ReducerManagerType
}

export interface ExtraArgumentType {
	api: AxiosInstance,
	navigate: NavigateFunction
}

export interface ThunkConfig<T> {
	rejectValue: T,
	state: StateSchema,
	extra: ExtraArgumentType
}
