import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "../consts/localStorageKeys"

export const $api = axios.create({
	baseURL: __API__,
	headers: {
		authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || ""
	} // заголовки для получения данных авторизованным пользователям
})