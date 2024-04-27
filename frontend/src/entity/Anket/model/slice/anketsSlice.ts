import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchAnketsBySection } from "../services/fetchAnketsBySection/fetchAnketsBySection"
import { AnketsPageSchema } from "../types/ankets"
import { IUser } from "entity/User"

const initialState: AnketsPageSchema = {
	isLoading: false,
	users: [],
}

export const anketsPageSlice = createSlice({
	name: "anketsPageSlice",
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAnketsBySection.pending, (state) => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(fetchAnketsBySection.fulfilled, (state, action: PayloadAction<IUser[]>) => {
				state.isLoading = false
				state.users = action.payload
			})
			.addCase(fetchAnketsBySection.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const { actions: anketsPageActions } = anketsPageSlice
export const { reducer: anketsPageReducer } = anketsPageSlice