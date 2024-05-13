import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider/index"
import { Profile } from "entity/ProfileCard"
import { getUserAuthData } from "entity/User"

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
			rejectWithValue,
			getState
		} = thunkAPI

		const authData = getUserAuthData(getState())

		const requestObj = {
			userId: authData ? authData.userId : "",
			otheruserId: profileId
		}

		try {
			const response = await extra.api.post<Profile>("/profile", requestObj, {
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
			return rejectWithValue("Ошибка при получении данных профиля. Попробуйте обновить страницу")
		}	
	},
)