import { ReactNode } from "react"
import { Provider } from "react-redux"
import { ExtraArgumentType, StateSchema } from "../config/types"
import { ReducersMapObject } from "@reduxjs/toolkit"
import { createReduxStore } from "../config/store"
import React from "react"

interface StoreProviderProps {
	children: ReactNode,
	initialState?: DeepPartial<StateSchema>,
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
	
	const {
		children,
		initialState,
		asyncReducers
	} = props

	const store = createReduxStore(
		initialState as StateSchema,
		asyncReducers as ReducersMapObject<StateSchema>
	)

	return (
		<Provider store = {store}>
			{children}
		</Provider>
	)
}