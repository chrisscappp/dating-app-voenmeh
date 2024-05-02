import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { NotificationsSchema, NotificationType } from "../types/types"
import { fetchNotifications } from "../services/fetchNotifications/fetchNotifications"
import { removeNotifications } from "../services/removeNotifications/removeNotifications"

const initialState: NotificationsSchema = {
	isLoading: false,
	notifications: []
}

export const notificationsSlice = createSlice({
	name: "notificationsList",
	initialState,
	reducers: {
		
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotifications.pending, (state) => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(fetchNotifications.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = undefined
				state.notifications = action.payload
			})
			.addCase(fetchNotifications.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})

			.addCase(removeNotifications.pending, (state) => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(removeNotifications.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = undefined
				state.notifications = action.payload
			})
			.addCase(removeNotifications.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const { actions: notificationsActions } = notificationsSlice
export const { reducer: notificationsReducer } = notificationsSlice