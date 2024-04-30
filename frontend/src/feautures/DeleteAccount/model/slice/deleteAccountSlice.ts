import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DeleteAccountForm, DeleteAccountSchema } from "../types/types"
import { deleteAccount } from "../services/deleteAccount"

const initialState: DeleteAccountSchema = {
	isLoading: false,
	form: {
		password: "",
		repeatPassword: ""
	}
}

export const deleteAccountSlice = createSlice({
	name: "deleteAccount",
	initialState,
	reducers: {
		setPassword: (state, action: PayloadAction<string>) => {
			state.form.password = action.payload
		},
		setRepeatPassword: (state, action: PayloadAction<string>) => {
			state.form.repeatPassword = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(deleteAccount.pending, (state) => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(deleteAccount.fulfilled, (state, action: PayloadAction<DeleteAccountForm>) => {
				state.isLoading = false
				state.error = undefined
				state.form = action.payload
			})
			.addCase(deleteAccount.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const { actions: deleteAccountActions } = deleteAccountSlice
export const { reducer: deleteAccountReducer } = deleteAccountSlice