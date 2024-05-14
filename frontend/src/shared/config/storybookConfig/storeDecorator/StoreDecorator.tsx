import { Decorator, StoryFn } from "@storybook/react"
import React from "react"
import { StateSchema, StoreProvider } from "app/providers/StoreProvider"
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { loginFormReducer } from "feautures/Login"
import { registerFormReducer } from "feautures/Register"
import { changePasswordReducer } from "feautures/ChangePassword"
import { forgetPasswordReducer } from "feautures/ForgetPassword"
import { anketsListReducer, interactAnketsReducer } from "entity/Anket"
import { deleteAccountReducer } from "feautures/DeleteAccount"
import { editableProfileReducer } from "feautures/EditableProfile"
import { wrongAnketReducer } from "feautures/WrongAnket"

const initialAsyncReducers: ReducersList = {
	loginForm: loginFormReducer,
	registerForm: registerFormReducer,
	changePassword: changePasswordReducer,
	anketsList: anketsListReducer,
	interactAnkets: interactAnketsReducer,
	deleteAccount: deleteAccountReducer,
	editableProfile: editableProfileReducer,
	forgetPassword: forgetPasswordReducer,
	wrongAnket: wrongAnketReducer
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