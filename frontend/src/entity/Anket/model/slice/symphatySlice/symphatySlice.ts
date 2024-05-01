import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { fetchAnkets } from "../../services/fetchAnkets/fetchAnkets"
import { IUser } from "entity/User"
import { StateSchema } from "app/providers/StoreProvider"
import { SymphatyAnketsSchema } from "../../types/symphatyAnkets"

const symphatyAnketsAdapter = createEntityAdapter({
	selectId: (anket: IUser) => anket.userId,
})

export const getSymphatyAnkets = symphatyAnketsAdapter.getSelectors<StateSchema>(
	(state) => state.symphatyAnkets || symphatyAnketsAdapter.getInitialState()
)

export const symphatyAnketsSlice = createSlice({
	name: "symphatyAnketsSlice",
	initialState: symphatyAnketsAdapter.getInitialState<SymphatyAnketsSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {}
	}),
	reducers: {
		dislikeAnket: (state, id: PayloadAction<string>) => {
			symphatyAnketsAdapter.removeOne(state, id)
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
					symphatyAnketsAdapter.setAll(state, action.payload)
				}
			})
			.addCase(fetchAnkets.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const { actions: symphatyAnketsActions } = symphatyAnketsSlice
export const { reducer: symphatyAnketsReducer } = symphatyAnketsSlice