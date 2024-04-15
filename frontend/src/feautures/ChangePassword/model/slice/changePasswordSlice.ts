import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ChangePasswordForm, ChangePasswordSchema } from "../types/changePassword"
import { Profile } from "entity/ProfileCard"
import { updateUserPassword } from "../services/updateUserPassword"

const initialState: ChangePasswordSchema = {
	isLoading: false,
	form: {
		newPassword: "",
		oldPassword: ""
	}
}

export const changePasswordSlice = createSlice({
	name: "changePasswordProfile",
	initialState,
	reducers: {
		setOldPassword: (state, action: PayloadAction<string>) => {
			state.form.oldPassword = action.payload
		},
		setNewPassword: (state, action: PayloadAction<string>) => {
			state.form.newPassword = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateUserPassword.pending, (state) => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(updateUserPassword.fulfilled, (state, action: PayloadAction<ChangePasswordForm>) => {
				state.isLoading = false
				state.error = undefined
				state.form = action.payload
			})
			.addCase(updateUserPassword.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const { actions: changePasswordActions } = changePasswordSlice
export const { reducer: changePasswordReducer } = changePasswordSlice