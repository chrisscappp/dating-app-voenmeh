import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "./types";
import { createReducerManager } from "./reducerManager";
import { userReducer } from "entities/User";

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		//...asyncReducers,
		user: userReducer
	}

	const reducerManager = createReducerManager(rootReducers)

	const store = configureStore({
		reducer: rootReducers,
		devTools: __IS_DEV__,
		preloadedState: initialState
	})

	//@ts-ignore
	//store.reducerManager = reducerManager

	return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']