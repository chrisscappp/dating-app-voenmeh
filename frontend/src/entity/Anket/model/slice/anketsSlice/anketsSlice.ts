import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { fetchAnkets } from "../../services/fetchAnkets/fetchAnkets"
import { IUser } from "entity/User"
import { StateSchema } from "app/providers/StoreProvider"
import { AnketsListSchema } from "../../types/anketsList"

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
	}
})

export const { actions: anketsListActions } = anketsListSlice
export const { reducer: anketsListReducer } = anketsListSlice