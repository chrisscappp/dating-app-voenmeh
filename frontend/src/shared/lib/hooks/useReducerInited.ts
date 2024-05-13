import { useEffect, useState } from "react"
import { useStore } from "react-redux"
import { StateSchemaKey } from "app/providers/StoreProvider"
import { ReducersList } from "../components/DynamicModuleLoader/DynamicModuleLoader"

export function useReducerInited(reducerKey: StateSchemaKey) {
	const [ isInited, setIsInited ] = useState<boolean>(false)

	const store = useStore()
	useEffect(() => {
		const state: ReducersList = store.getState()
		if (state[reducerKey]) {
			setIsInited(true)
		}
	}, [reducerKey, store])

	return isInited
}