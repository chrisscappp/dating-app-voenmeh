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
		const oldPass = "12345678"

		if (oldPass !== formData?.oldPassword) {
			return rejectWithValue("Старый пароль указан неверно")
		}

		// получать пароль с бэка

		try {
			// const response = await extra.api.put<ChangePasswordForm>(`/edit/${userId}`, formData, {
			// 	headers: {
			// 		"Content-Type": "application/json"
			// 	}
			// })
			
			// if (!response.data) {
			// 	throw new Error()
			// }

			const res: ChangePasswordForm = {
				newPassword: "",
				oldPassword: formData.oldPassword
			}

			return res
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке редактирования профиля :(")
		}	
	},
)