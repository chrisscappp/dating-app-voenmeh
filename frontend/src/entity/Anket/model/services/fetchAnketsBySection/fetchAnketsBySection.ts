import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { getUserAuthData, IUser } from "entity/User"

export const fetchAnketsBySection = createAsyncThunk<
	IUser[], 
	string, 
	ThunkConfig<string>
>(
	"ankets/fetchAnketsBySection",
	async (sectionId, thunkAPI) => {
		const {
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const authId = getUserAuthData(getState())
	
		try {
			const response = await extra.api.get(`/${sectionId}/${authId}`)
			if (!response.data) {
				throw new Error()
			}
			console.log("RESPINSE", response)
			return response.data.profiles
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке получения анкет :(")
		}	
	},
)