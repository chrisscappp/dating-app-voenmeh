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

		
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const formData = getProfileForm(getState())

		//const errors = validateProfileData(formData)
		//if (errors.length) {
		//	return rejectWithValue(errors)
		//}
		const copy = JSON.parse(JSON.stringify(formData))

		for (const key in copy) {
			if (copy[key] === null) {
				copy[key] = undefined
			}
		}
		
		try {
			console.log("BEFORE")
			const response = await extra.api.put<Profile>(`/edit/${userId}`, copy, {
				headers: {
					"Content-Type": "application/json"
				}
			})
			console.log("AFTER")

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