import { createAsyncThunk } from "@reduxjs/toolkit"
import { IUser } from "entities/User/index"
import { userActions } from "entities/User"
import { USER_LOCALSTORAGE_KEY } from "shared/consts/localStorageKeys"
import { ThunkConfig } from "app/providers/StoreProvider/index"

interface LoginByUsernameProps {
	login: string | undefined;
	password: string | undefined;
	email: string | undefined;
}

export const loginByUsername = createAsyncThunk<
	IUser, 
	LoginByUsernameProps, 
	ThunkConfig<string>
>(
	"login/loginByUsername",
	async (authData, thunkAPI) => {
		const {
			dispatch,
			extra,
			rejectWithValue
		} = thunkAPI

		try {
			const response = await extra.api.post<IUser>("/authByLogin", authData)
			if (!response.data) {
				throw new Error()
			}
			
			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
			dispatch(userActions.setAuthData(response.data))
			extra.navigate("/ankets")
			return response.data
		} catch (e: unknown) {
			const err = e as Error
			return rejectWithValue("Неверный логин или пароль")
		}	
	},
)
// вызывается внутри компонента