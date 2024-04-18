import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { DeleteAccountForm } from "../types/types"
import { getDeleteAccountForm } from "../selectors/getDeleteAccountForm/getDeleteAccountForm"
import { getUserAuthData } from "entity/User"

export const deleteAccount = createAsyncThunk<
	DeleteAccountForm, 
	void, 
	ThunkConfig<string>
>(
	"profile/deleteAccount",
	async (_, thunkAPI) => {
		const {
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const authData = getUserAuthData(getState())
		const formData = getDeleteAccountForm(getState())

		try {
			const response = await extra.api.delete<DeleteAccountForm>(`/removeProfile/${authData?.userId}`, {
				data: formData,
				headers: {
					"Content-Type": "application/json"
				}
			})

			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке удаления профиля :(")
		}	
	},
)