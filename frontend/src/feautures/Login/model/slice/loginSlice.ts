import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { LoginSchema } from "../types/login"
import { loginByUsername } from "../services/authByUsername/authByUsername"

const initialState: LoginSchema = {
	username: "",
	password: "",
	email: "",
	error: "",
	isLoading: false,
}

export const loginSlice = createSlice({
	name: "loginForm",
	initialState,
	reducers: {
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginByUsername.pending, (state) => {
				state.isLoading = true
			})
			.addCase(loginByUsername.fulfilled, (state, action) => {
				state.error = undefined
				state.isLoading = false
				//state.username = action.payload.username
			})
			.addCase(loginByUsername.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	}
})

export const { actions: loginFormActions } = loginSlice
export const { reducer: loginFormReducer } = loginSlice