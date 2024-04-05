export {
	userActions,
	userReducer
} from "./model/slice/userSlice"

export { UserSchema, IUser } from "./model/types/user"
export { getUserAuthData } from "./model/selectors/getUserAuthData/getUserAuthData"
export { getUserAuthInited } from "./model/selectors/getUserAuthInited/getUserAuthInited"