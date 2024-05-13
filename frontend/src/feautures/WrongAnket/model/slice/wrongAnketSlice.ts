import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { WrongAnketSchema } from "../types/wrongAnket"
import { sendWrong } from "../services/sendWrong"

const initialState: WrongAnketSchema = {
	isLoading: false,
}

export const wrongAnketSlice = createSlice({
	name: "wrongAnketSlice",
	initialState,
	reducers: {
		setMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			// send wrong
			.addCase(sendWrong.pending, (state) => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(sendWrong.fulfilled, (state, action: PayloadAction<string>) => {
				state.isLoading = false
			})
			.addCase(sendWrong.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const { actions: wrongAnketActions } = wrongAnketSlice
export const { reducer: wrongAnketReducer } = wrongAnketSlice