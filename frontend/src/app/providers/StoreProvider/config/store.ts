import { configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit"
import { ExtraArgumentType, StateSchema } from "./types"
import { createReducerManager } from "./reducerManager"
import { userReducer } from "entity/User"
import { $api } from "shared/api/api"
import { useNavigate } from "react-router"

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		user: userReducer,
	}

	const reducerManager = createReducerManager(rootReducers)

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const navigate = useNavigate()

	const extraArg: ExtraArgumentType = {
		api: $api,
		navigate: navigate
	}

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: getDefaultMiddleware => getDefaultMiddleware({
			thunk: {
				extraArgument: extraArg
			}
		})
	})

	//@ts-ignore
	store.reducerManager = reducerManager

	return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]