import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { fetchAnketsBySection } from "../../services/fetchAnketsBySection/fetchAnketsBySection"
import { likeAnketCard } from "../../services/likeAnket/likeAnket"
import { AnketsPageSchema, RequestAnkets } from "../../types/ankets"
import { IUser } from "entity/User"
import { StateSchema } from "app/providers/StoreProvider"
import { dislikeAnketCard } from "../../services/dislikeAnket/dislikeAnket"

const anketsAdapter = createEntityAdapter({
	selectId: (anket: IUser) => anket.userId,
})

export const getAnketsList = anketsAdapter.getSelectors<StateSchema>(
	(state) => state.ankets || anketsAdapter.getInitialState()
)

export const anketsPageSlice = createSlice({
	name: "anketsPageSlice",
	initialState: anketsAdapter.getInitialState<AnketsPageSchema>({
		isLoading: false,
		error: undefined,
		topStack: undefined,
		ids: [],
		entities: {}
	}),
	reducers: {
		removeAnket: (state, id: PayloadAction<string>) => {
			anketsAdapter.removeOne(state, id)
		},
		changeTopStack: (state) => {
			state.topStack = state.ids[state.ids.length - 1]
		}
	},
	extraReducers: (builder) => {
		builder
			// fetch ankets
			.addCase(fetchAnketsBySection.pending, (state) => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(fetchAnketsBySection.fulfilled, (state, action: PayloadAction<IUser[]>) => {
				state.isLoading = false
				if (action.payload?.length > 0) {
					anketsAdapter.setAll(state, action.payload)
					state.topStack = action.payload[action.payload.length - 1].userId
				}
			})
			.addCase(fetchAnketsBySection.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
			// liked anket
			.addCase(likeAnketCard.pending, (state) => {
				state.isLiked = false
				state.error = undefined
			})
			.addCase(likeAnketCard.fulfilled, (state, action: PayloadAction<RequestAnkets>) => {
				state.isLiked = true
				anketsAdapter.removeOne(state, action.payload.otheruserId)
				state.topStack = state.ids[state.ids.length - 1]
				state.error = undefined
			})
			.addCase(likeAnketCard.rejected, (state, action) => {
				state.isLiked = false
				state.error = action.payload
			})
			// dislike anket
			.addCase(dislikeAnketCard.pending, (state) => {
				state.isDisliked = false
				state.error = undefined
			})
			.addCase(dislikeAnketCard.fulfilled, (state, action: PayloadAction<RequestAnkets>) => {
				state.isDisliked = true
				anketsAdapter.removeOne(state, action.payload.otheruserId)
				state.topStack = state.ids[state.ids.length - 1]
				state.error = undefined
			})
			.addCase(dislikeAnketCard.rejected, (state, action) => {
				state.isDisliked = false
				state.error = action.payload
			})
	}
})

export const { actions: anketsPageActions } = anketsPageSlice
export const { reducer: anketsPageReducer } = anketsPageSlice