import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Contact } from "entity/ProfileCard"

export const fetchAnketContacts = createAsyncThunk<
	Contact, 
	string, 
	ThunkConfig<string>
>(
	"ankets/fetchAnketContacts",
	async (userId, thunkAPI) => {
		const {
			extra,
			rejectWithValue,
		} = thunkAPI
	
		try {
			const response = await extra.api.get<Contact>(`/userContacts/${userId}`)
			if (!response.data) {
				throw new Error()
			}

			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке получения контакта")
		}	
	},
)