import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { getUserAuthData, IUser } from "entity/User"
import { TOP_STACK_KEY } from "shared/consts/localStorageKeys"

export const fetchAnkets = createAsyncThunk<
	IUser[], 
	string, 
	ThunkConfig<string>
>(
	"ankets/fetchAnkets",
	async (sectionId, thunkAPI) => {
		const {
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const authData = getUserAuthData(getState())
	
		try {
			const response = await extra.api.get(`/${sectionId}/${authData?.userId}`, {
				headers: {
					"topStack": `${localStorage.getItem(TOP_STACK_KEY) || ""}`
				}
			})
			if (!response.data) {
				throw new Error()
			}
			
			return response.data.profiles
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке получения анкет")
		}	
	},
)