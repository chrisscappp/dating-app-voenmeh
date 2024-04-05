import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RegisterSchema, RegisterForm } from "../types/register"
import { registerByUsername } from "../services/registerByUsername"
import { FormErrorType } from "../types/errors"

const initialState: RegisterSchema = {
	isLoading: false,
	formData: {
		checkBoxFlag: false,
	},
}

export const registerSlice = createSlice({
	name: "registerForm",
	initialState,
	reducers: {
		setRegisterFormField: (state, action: PayloadAction<RegisterForm>) => {
			state.formData = {
				...state.formData,
				...action.payload
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerByUsername.pending, (state) => {
				state.isLoading = true
			})
			.addCase(registerByUsername.fulfilled, (state) => {
				state.error = undefined
				state.validateErrors = undefined
				state.isLoading = false
			})
			.addCase(registerByUsername.rejected, (state, action) => {
				state.isLoading = false
				state.validateErrors = action.payload as FormErrorType[]
			})
	}
})

export const { actions: registerFormActions } = registerSlice
export const { reducer: registerFormReducer } = registerSlice