import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Profile } from "entity/ProfileCard"
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm"

export const updateProfileData = createAsyncThunk<
	Profile, 
	string, 
	ThunkConfig<string>
>(
	"profile/updateProfileData",
	async (userId, thunkAPI) => {
		const {
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const formData = getProfileForm(getState())

		//const errors = validateProfileData(formData)
		//if (errors.length) {
		//	return rejectWithValue(errors)
		//}

		console.log("FORMDATA", formData)
		
		try {
			const response = await extra.api.put<Profile>(`/edit/${userId}`, formData, {
				headers: {
					"Content-Type": "application/json"
				}
			})

			console.log("RESPONSE ss", response.data)
			
			if (!response.data) {
				throw new Error()
			}

			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке редактирования профиля :(")
		}	
	},
)