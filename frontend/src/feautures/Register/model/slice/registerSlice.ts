import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RegisterSchema, RegisterForm } from "../types/register"

const initialState: RegisterSchema = {
	isLoading: false,
	formData: {
		sex: ""
	}
}

export const registerSlice = createSlice({
	name: 'registerForm',
	initialState,
	reducers: {
		setRegisterFormField: (state, action: PayloadAction<RegisterForm>) => {
			state.formData = {
				...state.formData,
				...action.payload
			}
		}
	}
})

export const { actions: registerFormActions } = registerSlice
export const { reducer: registerFormReducer } = registerSlice