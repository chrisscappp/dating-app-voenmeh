import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider/index"
import { Profile } from "entity/ProfileCard"

export const fetchAnketCardData = createAsyncThunk<
	Profile, 
	string, 
	ThunkConfig<string>
>(
	"anketCard/fetchProfileData",
	async (profileId, thunkAPI) => {
		const {
			dispatch,
			extra,
			rejectWithValue
		} = thunkAPI

		try {
			const response = await extra.api.get<Profile>(`/profile/${profileId}`)
			if (!response.data) {
				throw new Error("Данные не найдены")
			}
		
			return response.data
		} catch (e: unknown) {
			const err = e as Error
			console.error(err)
			return rejectWithValue("Ошибка при получении данных профиля. Попробуйте обновить страницу")
		}	
	},
)