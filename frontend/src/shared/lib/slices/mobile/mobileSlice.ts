import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MobileSchema } from "./types"

const initialState: MobileSchema = {
	isMobile: false
}

export const mobileSlice = createSlice({
	name: "mobileUI",
	initialState,
	reducers: {
		setMobile: (state, action: PayloadAction<boolean>) => {
			console.log("ACTION")
			state.isMobile = action.payload
		},
	}
})

export const { actions: mobileActions } = mobileSlice
export const { reducer: mobileReducer } = mobileSlice