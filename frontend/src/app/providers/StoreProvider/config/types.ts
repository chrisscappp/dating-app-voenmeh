import { AnyAction, ReducersMapObject, Reducer  } from "@reduxjs/toolkit"
import { AxiosInstance } from "axios"
import { UserSchema } from "entity/User"
import { LoginSchema } from "feautures/Login"
import { RegisterSchema } from "feautures/Register"
import { EditableProfileSchema } from "feautures/EditableProfile"
import { NavigateFunction } from "react-router"
import { ChangePasswordSchema } from "feautures/ChangePassword"
import { DeleteAccountSchema } from "feautures/DeleteAccount"
import { NotificationsSchema } from "feautures/Notifications"
import { InteractAnketsSchema, AnketsListSchema } from "entity/Anket"
import { WrongAnketSchema } from "feautures/WrongAnket"
import { ForgetPasswordSchema } from "feautures/ForgetPassword"

export interface StateSchema {
	user: UserSchema,
	notifications: NotificationsSchema

	//async
	loginForm?: LoginSchema,
	registerForm?: RegisterSchema,
	editableProfile?: EditableProfileSchema,
	changePassword?: ChangePasswordSchema,
	deleteAccount?: DeleteAccountSchema,
	interactAnkets?: InteractAnketsSchema,
	anketsList?: AnketsListSchema,
	wrongAnket?: WrongAnketSchema,
	forgetPassword?: ForgetPasswordSchema
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
