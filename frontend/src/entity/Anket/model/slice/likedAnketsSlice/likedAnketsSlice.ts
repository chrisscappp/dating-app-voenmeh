import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { fetchAnkets } from "../../services/fetchAnkets/fetchAnkets"
import { LikedAnketsSchema } from "../../types/likedAnkets"
import { IUser } from "entity/User"
import { StateSchema } from "app/providers/StoreProvider"

const likedAnketsAdapter = createEntityAdapter({
	selectId: (anket: IUser) => anket.userId,
})

export const getLikedAnkets = likedAnketsAdapter.getSelectors<StateSchema>(
	(state) => state.likedAnkets || likedAnketsAdapter.getInitialState()
)

export const likedAnketsSlice = createSlice({
	name: "likedAnketsSlice",
	initialState: likedAnketsAdapter.getInitialState<LikedAnketsSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {}
	}),
	reducers: {
		dislikeAnket: (state, id: PayloadAction<string>) => {
			likedAnketsAdapter.removeOne(state, id)
		}
	},
	extraReducers: (builder) => {
		builder
			// fetch ankets
			.addCase(fetchAnkets.pending, (state) => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(fetchAnkets.fulfilled, (state, action: PayloadAction<IUser[]>) => {
				state.isLoading = false
				if (action.payload?.length > 0) {
					likedAnketsAdapter.setAll(state, action.payload)
				}
			})
			.addCase(fetchAnkets.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const { actions: likedAnketsActions } = likedAnketsSlice
export const { reducer: likedAnketsReducer } = likedAnketsSlice