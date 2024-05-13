import { createAsyncThunk } from "@reduxjs/toolkit"
import { IUser, userActions } from "entity/User"
import { USER_LOCALSTORAGE_KEY } from "shared/consts/localStorageKeys"
import { ThunkConfig } from "app/providers/StoreProvider/index"
import { RegisterForm } from "../types/register"
import { FormErrorType } from "../types/errors"
import { validateForm } from "./validateForm"
import { useSelector } from "react-redux"
import { getRegisterFormState } from "../selectors/getRegisterState"

type RegisterFormForBackend = Omit<RegisterForm, "checkBoxFlag" | "repeatPassword">

interface RegProps extends RegisterFormForBackend {
	createdAt: string;
}

export const registerByUsername = createAsyncThunk<IUser, void, ThunkConfig<FormErrorType[]>>(
	"register/registerByUsername",
	async (_, thunkAPI) => {
		const {
			dispatch,
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		try {
			const regForm = getRegisterFormState(getState())
			
			if (!regForm) {
				return rejectWithValue([FormErrorType.EMPTY_FORM])
			}

			const errors = validateForm(regForm)

			if (errors.length > 0) {
				return rejectWithValue(errors)
			}

			const regData = JSON.parse(JSON.stringify(regForm))

			delete regData["checkBoxFlag"]
			delete regData["repeatPassword"]
			regData.createdAt = new Date().toLocaleDateString()

			const response = await extra.api.post<IUser>("/register", regData)
			
			if (!response.data) {
				throw new Error()
			}

			console.log("RESPONSE", response.data)
			
			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
			dispatch(userActions.setAuthData(response.data))
			extra.navigate(`/profile/${response.data.userId}`)
			return response.data
		} catch (e: unknown) {
			//@ts-ignore
			switch (e.response.data.detail) {
			case FormErrorType.EMAIL_ALREADY: {
				return rejectWithValue([FormErrorType.EMAIL_ALREADY])
			}
			case FormErrorType.LOGIN_ALREADY: {
				return rejectWithValue([FormErrorType.LOGIN_ALREADY])
			}
			case FormErrorType.PASSWORD_INVALID: {
				return rejectWithValue([FormErrorType.PASSWORD_INVALID])
			}
			default: return rejectWithValue([FormErrorType.SERVER_ERROR])
			}
		}	
	},
)