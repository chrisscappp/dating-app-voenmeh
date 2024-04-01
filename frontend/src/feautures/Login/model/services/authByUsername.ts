import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from "entities/User/index";
import { userActions } from "entities/User/index"
import { USER_LOCALSTORAGE_KEY } from "shared/consts/localStorageKeys"
import { ThunkConfig } from "app/providers/StoreProvider/index";
import axios from "axios";

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<
	IUser, 
	LoginByUsernameProps, 
	ThunkConfig<string>
>(
  	'login/loginByUsername',
  	async (authData, thunkAPI) => {
		const {
			dispatch,
			extra,
			rejectWithValue
		} = thunkAPI

		try {
    		const response = await extra.api.post<IUser>("/login", authData)
			if (!response.data) {
				throw new Error()
			}
			
			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
			dispatch(userActions.setAuthData(response.data))
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Неверный логин или пароль")
		}	
  	},
)
// вызывается внутри компонента