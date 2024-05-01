import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { fetchAnkets } from "../../services/fetchAnkets/fetchAnkets"
import { likeAnketCard } from "../../services/likeAnket/likeAnket"
import { InteractAnketsSchema, RequestAnkets } from "../../types/interactAnkets"
import { IUser } from "entity/User"
import { StateSchema } from "app/providers/StoreProvider"
import { dislikeAnketCard } from "../../services/dislikeAnket/dislikeAnket"

const interactAnketsAdapter = createEntityAdapter({
	selectId: (anket: IUser) => anket.userId,
})

export const getInteractAnketsList = interactAnketsAdapter.getSelectors<StateSchema>(
	(state) => state.interactAnkets || interactAnketsAdapter.getInitialState()
)

export const interactAnketsSlice = createSlice({
	name: "interactAnketsSlice",
	initialState: interactAnketsAdapter.getInitialState<InteractAnketsSchema>({
		isLoading: false,
		error: undefined,
		topStack: undefined,
		ids: [],
		entities: {}
	}),
	reducers: {
		removeAnket: (state, id: PayloadAction<string>) => {
			interactAnketsAdapter.removeOne(state, id)
		},
		changeTopStack: (state) => {
			state.topStack = state.ids[state.ids.length - 1]
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
					interactAnketsAdapter.setAll(state, action.payload)
					state.topStack = action.payload[action.payload.length - 1].userId
				}
			})
			.addCase(fetchAnkets.rejected, (state, action) => {
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
				interactAnketsAdapter.removeOne(state, action.payload.otheruserId)
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
				interactAnketsAdapter.removeOne(state, action.payload.otheruserId)
				state.topStack = state.ids[state.ids.length - 1]
				state.error = undefined
			})
			.addCase(dislikeAnketCard.rejected, (state, action) => {
				state.isDisliked = false
				state.error = action.payload
			})
	}
})

export const { actions: interactAnketsActions } = interactAnketsSlice
export const { reducer: interactAnketsReducer } = interactAnketsSlice