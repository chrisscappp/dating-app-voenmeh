import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Contact } from "entity/ProfileCard"
import { WrongRequest } from "../types/wrongAnket"
import { getUserAuthData } from "entity/User"
import { getWrongAnketMessage } from "../selectors/getWrongAnketMessage/getWrongAnketMessage"

export const sendWrong = createAsyncThunk<
	string, 
	string, 
	ThunkConfig<string>
>(
	"ankets/sendWrongAnket",
	async (userId, thunkAPI) => {
		const {
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const message = getWrongAnketMessage(getState())
		const authData = getUserAuthData(getState())

		const requestBody: WrongRequest = {
			message: message as string,
			sender: authData?.userId as string,
			wrongAnket: userId
		}
	
		try {
			const response = await extra.api.post<string>("/wrongAnket", requestBody)
			if (!response.data) {
				throw new Error()
			}

			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке жалобы на анкету :(")
		}	
	},
)