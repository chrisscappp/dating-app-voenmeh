import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { getUserAuthData, IUser } from "entity/User"
import { AnketsPesponse } from "../../types/likedAnkets"

export const fetchLikedAnkets = createAsyncThunk<
	IUser[], 
	void, 
	ThunkConfig<string>
>(
	"ankets/fetchLikedAnkets",
	async (_, thunkAPI) => {
		const {
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const authData = getUserAuthData(getState())
	
		try {
			const response = await extra.api.get(`/likedAnkets/${authData?.userId}`)
			if (!response.data) {
				throw new Error()
			}

			return response.data.profiles
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке получения анкет :(")
		}	
	},
)