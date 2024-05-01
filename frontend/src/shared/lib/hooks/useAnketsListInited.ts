import { useEffect, useState } from "react"
import { useStore } from "react-redux"
import { ReducersList } from "../components/DynamicModuleLoader/DynamicModuleLoader"

export function useAnketsListInited() {
	const [ anketsListInited, setAnketsListInited ] = useState<boolean>(false)

	const store = useStore()
	useEffect(() => {
		const state: ReducersList = store.getState()
		
		if (state.anketsList) {
			setAnketsListInited(true)
		}
	}, [store])

	return anketsListInited
}