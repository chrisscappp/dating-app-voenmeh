import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider/index"
import { getUserAuthData } from "entity/User"

export const fetchNotifications = createAsyncThunk<
	string[], 
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
			const response = await extra.api.get<string[]>(`/notifications/${authData?.userId}`, {
				headers: {
					"Content-Type": "application/json"
				}
			})
			if (!response.data) {
				throw new Error("Данные не найдены")
			}
		
			return response.data
		} catch (e: unknown) {
			const err = e as Error
			console.error(err)
			return rejectWithValue("Ошибка при получении уведомлений. Попробуйте обновить страницу")
		}	
	},
)