import { Decorator, StoryFn } from "@storybook/react"
import React from "react"
import { StateSchema, StoreProvider } from "app/providers/StoreProvider"
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { loginFormReducer } from "feautures/Login"
import { registerFormReducer } from "feautures/Register"
import { changePasswordReducer } from "feautures/ChangePassword"
import { notificationsReducer } from "feautures/Notifications"

const initialAsyncReducers: ReducersList = {
	loginForm: loginFormReducer,
	registerForm: registerFormReducer,
	changePassword: changePasswordReducer,
	notifications: notificationsReducer
}

export const StoreDecorator = (
	state: DeepPartial<StateSchema>,
	asyncReducers?: ReducersList
): Decorator => (StoryComponent: StoryFn)  => {
	return (
		<StoreProvider 
			initialState={state}
			asyncReducers={{...initialAsyncReducers, ...asyncReducers}}
		>
			<StoryComponent/>
		</StoreProvider>
	)
}