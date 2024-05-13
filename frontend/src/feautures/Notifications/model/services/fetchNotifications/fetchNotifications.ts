import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider/index"
import { getUserAuthData } from "entity/User"
import { NotificationType } from "../../types/types"

export const fetchNotifications = createAsyncThunk<
	NotificationType[], 
	void, 
	ThunkConfig<string>
>(
	"notifications/fetchNotifications",
	async (_, thunkAPI) => {
		const {
			dispatch,
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const authData = getUserAuthData(getState())

		try {
			const response = await extra.api.get(`/notificationsList/${authData?.userId}`, {
				headers: {
					"Content-Type": "application/json"
				}
			})

			if (!response.data) {
				throw new Error("Данные не найдены")
			}
		
			return response.data.notifications
		} catch (e: unknown) {
			const err = e as Error
			console.error(err)
			return rejectWithValue("Ошибка при получении уведомлений. Попробуйте обновить страницу")
		}	
	},
)