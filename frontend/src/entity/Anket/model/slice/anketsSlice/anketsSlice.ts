import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { fetchAnkets } from "../../services/fetchAnkets/fetchAnkets"
import { IUser } from "entity/User"
import { StateSchema } from "app/providers/StoreProvider"
import { AnketsListSchema, RequestAnkets } from "../../types/anketsList"
import { likeAnketCard } from "../../services/likeAnket/likeAnket"
import { dislikeAnketCard } from "../../services/dislikeAnket/dislikeAnket"
import { fetchAnketContacts } from "../../services/fetchAnketContacts/fetchAnketContacts"
import { Contact } from "entity/ProfileCard"

const anketsListAdapter = createEntityAdapter({
	selectId: (anket: IUser) => anket.userId,
})

export const getAnketsList = anketsListAdapter.getSelectors<StateSchema>(
	(state) => state.anketsList || anketsListAdapter.getInitialState()
)

export const anketsListSlice = createSlice({
	name: "anketsListSlice",
	initialState: anketsListAdapter.getInitialState<AnketsListSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {}
	}),
	reducers: {
		dislikeAnket: (state, id: PayloadAction<string>) => {
			anketsListAdapter.removeOne(state, id)
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
					anketsListAdapter.setAll(state, action.payload)
				}
			})
			.addCase(fetchAnkets.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
			// liked anket
			.addCase(likeAnketCard.pending, (state) => {
				state.error = undefined
			})
			.addCase(likeAnketCard.fulfilled, (state, action: PayloadAction<RequestAnkets>) => {
				anketsListAdapter.removeOne(state, action.payload.otheruserId)
				state.error = undefined
			})
			.addCase(likeAnketCard.rejected, (state, action) => {
				state.error = action.payload
			})
			// dislike anket
			.addCase(dislikeAnketCard.pending, (state) => {
				state.error = undefined
			})
			.addCase(dislikeAnketCard.fulfilled, (state, action: PayloadAction<RequestAnkets>) => {
				anketsListAdapter.removeOne(state, action.payload.otheruserId)
				state.error = undefined
			})
			.addCase(dislikeAnketCard.rejected, (state, action) => {
				state.error = action.payload
			})
			// fetch anket contacts
			.addCase(fetchAnketContacts.pending, (state) => {
				state.error = undefined
			})
			.addCase(fetchAnketContacts.fulfilled, (state, action: PayloadAction<Contact>) => {
				state.error = undefined
			})
			.addCase(fetchAnketContacts.rejected, (state, action) => {
				state.error = action.payload
			})
	}
})

export const { actions: anketsListActions } = anketsListSlice
export const { reducer: anketsListReducer } = anketsListSlice