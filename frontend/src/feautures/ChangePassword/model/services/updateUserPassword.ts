import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { ChangePasswordForm } from "../types/changePassword"
import { getChangePasswordForm } from "../selectors/getChangePasswordForm/getChangePasswordForm"

export const updateUserPassword = createAsyncThunk<
	ChangePasswordForm, 
	string, 
	ThunkConfig<string>
>(
	"profile/updateUserPassword",
	async (userId, thunkAPI) => {
		const {
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const formData = getChangePasswordForm(getState())

		try {
			const response = await extra.api.put<ChangePasswordForm>(`/changePassword/${userId}`, formData, {
				headers: {
					"Content-Type": "application/json"
				}
			})

			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке редактирования профиля :(")
		}	
	},
)