import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider/index"
import { RequestAnkets } from "../../types/ankets"
import { getUserAuthData } from "entity/User"

export const likeAnketCard = createAsyncThunk<
	RequestAnkets, 
	string, 
	ThunkConfig<string>
>(
	"anketCard/likeAnketCard",
	async (anketId, thunkAPI) => {
		const {
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		try {
			const authData = getUserAuthData(getState())
			const requestBody: RequestAnkets = {
				otheruserId: anketId,
				userId: authData ? authData.userId : ""
			}
			const response = await extra.api.post<RequestAnkets>("/likeAnket", requestBody)
		
			return response.data
		} catch (e: unknown) {
			const err = e as Error
			console.error(err)
			return rejectWithValue("Произошла ошибка при попытке лайка анкеты. Попробуйте ещё раз...")
		}	
	},
)