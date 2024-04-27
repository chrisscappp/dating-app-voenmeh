import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import axios from "axios"
import { IUser } from "entity/User"

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
		} = thunkAPI

		try {
			const response = await extra.api.get(`/${sectionId}`)
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