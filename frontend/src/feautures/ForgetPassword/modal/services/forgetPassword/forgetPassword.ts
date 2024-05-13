import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider/index"
import { validateForgetForm } from "../validateForm/validateForm"

interface ForgetPasswordArgs {
	email?: string;
	login: string;
	password: string;
}

export const forgetPassword = createAsyncThunk<
	string, 
	ForgetPasswordArgs, 
	ThunkConfig<string>
>(
	"forgetPassword/forgetPasswordService",
	async (form, thunkAPI) => {
		const {
			extra,
			rejectWithValue
		} = thunkAPI

		const errors = validateForgetForm(form)

		if (errors.length > 0) {
			return rejectWithValue(errors[0])
		}

		try {
			const response = await extra.api.post<string>("/forget_password", form)
			if (!response.data) {
				throw new Error()
			}

			return response.data
		} catch (e: unknown) {
			return rejectWithValue("Произошла ошибка при попытке получения пароля")
		}	
	}
)