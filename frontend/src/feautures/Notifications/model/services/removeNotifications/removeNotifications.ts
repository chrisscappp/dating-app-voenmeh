import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider/index"
import { getUserAuthData } from "entity/User"

export const removeNotifications = createAsyncThunk<
	string[], 
	void, 
	ThunkConfig<string>
>(
	"notifications/removeNotifications",
	async (_, thunkAPI) => {
		const {
			dispatch,
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const authData = getUserAuthData(getState())

		try {
			const response = await extra.api.delete<string[]>(`/notifications/${authData?.userId}`)
			if (!response.data) {
				throw new Error("Данные не найдены")
			}
		
			return response.data
		} catch (e: unknown) {
			const err = e as Error
			console.error(err)
			return rejectWithValue("Ошибка при очищении уведомлений. Попробуйте обновить страницу")
		}	
	},
)