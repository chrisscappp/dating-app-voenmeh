import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { EditableProfileSchema } from "../types/profile"
import { Profile } from "entity/ProfileCard"
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData"
import { updateProfileData } from "../services/updateProfileData/updateProfileData"

const initialState: EditableProfileSchema = {
	isLoading: false,
	data: undefined,
	form: {},
	error: undefined,
	readonly: true,
	validateErrors: undefined
}

export const editableProfileSlice = createSlice({
	name: "editableProfileCard",
	initialState,
	reducers: {
		setReadonly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload
		},
		updateProfileField: (state, action: PayloadAction<Profile>) => {
			state.form = {
				...state.form,
				...action.payload
			}
		},
		cancelEdit: (state) => {
			state.readonly = true
			state.form = state.data
			state.validateErrors = undefined
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProfileData.pending, (state) => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
				state.isLoading = false
				state.data = action.payload
				state.form = action.payload
			})
			.addCase(fetchProfileData.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
			.addCase(updateProfileData.pending, (state) => {
				state.validateErrors = undefined
				state.isLoading = true
			})
			.addCase(updateProfileData.fulfilled, (
				state,
				action: PayloadAction<Profile>,
			) => {
				state.isLoading = false
				state.data = action.payload
				state.form = action.payload
				state.validateErrors = undefined
				state.readonly = true
			})
			.addCase(updateProfileData.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const { actions: editableProfileActions } = editableProfileSlice
export const { reducer: editableProfileReducer } = editableProfileSlice