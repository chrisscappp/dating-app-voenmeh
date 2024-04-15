import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider/index"
import { Profile } from "entity/ProfileCard"
import { FaluctetsItem } from "shared/consts/faluctets"
import { SelectInterestedItem } from "entity/SelectInterested"
import { BaseHobbies } from "entity/SelectHobbies"

export const fetchProfileData = createAsyncThunk<
	Profile, 
	string, 
	ThunkConfig<string>
>(
	"editableProfile/fetchProfileData",
	async (profileId, thunkAPI) => {
		const {
			dispatch,
			extra,
			rejectWithValue
		} = thunkAPI

		try {
			const response = await extra.api.get<Profile>(`/profile/${profileId}`)
			if (!response.data) {
				throw new Error("Данные не найдены")
			}

			// const mockData: Profile = {
			// 	firstname: "Артемий",
			// 	lastname: "Татьянович",
			// 	age: 91,
			// 	sex: "мужской",
			// 	faluctet: "О",
			// 	course: 2,
			// 	confirmedProfile: false,
			// 	about: "",
			// 	interested: [],
			// 	hobbies: [
			// 		"Синька"
			// 	],
			// 	contacts: {
			// 		vk: "https://vk.com/chrisscapp",
			// 		telegram: "@chrisscappp"
			// 	},
			// 	avatar: "https://yt3.googleusercontent.com/jcMyM0VktSLsiuzVji9uPQ5QpP0AeFDotoDcAq-OPKnXAQB5DzsFbnjWmkOeneszy4Pcog2_LQ=s900-c-k-c0x00ffffff-no-rj",
			// }
		
			return response.data
		} catch (e: unknown) {
			const err = e as Error
			console.error(err)
			return rejectWithValue("Ошибка при получении данных профиля. Попробуйте обновить страницу")
		}	
	},
)