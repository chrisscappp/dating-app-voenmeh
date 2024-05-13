import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ForgetPasswordSchema } from "../types/forgetPassword"
import { forgetPassword } from "../services/forgetPassword/forgetPassword"

const initialState: ForgetPasswordSchema = {
	error: "",
	isLoading: false,
}

export const forgetPasswordSlice = createSlice({
	name: "forgetPasswordForm",
	initialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(forgetPassword.pending, (state) => {
				state.isLoading = true
			})
			.addCase(forgetPassword.fulfilled, (state, action) => {
				state.error = undefined
				state.isLoading = false
				state.message = "На вашу почту пришло письмо"
			})
			.addCase(forgetPassword.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	}
})

export const { actions: forgetPasswordActions } = forgetPasswordSlice
export const { reducer: forgetPasswordReducer } = forgetPasswordSlice