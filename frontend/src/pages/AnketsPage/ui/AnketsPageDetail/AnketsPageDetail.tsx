import { AnketCardList, anketsPageReducer } from "entity/Anket"
import React, { memo, useEffect, useState } from "react"
import { useParams } from "react-router"
import { Page } from "widgets/Page"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useStore } from "react-redux"
import cls from "./AnketsPageDetail.module.scss"

const reducers: ReducersList = {
	ankets: anketsPageReducer
}

const AnketsPage = () => {
	
	const { sectionType: section } = useParams<{ sectionType: string }>()
	const [ anketsInited, setAnketsInited ] = useState<boolean>(false)

	const store = useStore()
	useEffect(() => {
		const state: ReducersList = store.getState()
		
		if (state.ankets) {
			setAnketsInited(true)
		}
	}, [store])
	
	return (
		<DynamicModuleLoader reducers = {reducers} removeAfterUnmount>
			<Page className = {cls.content}>
				{anketsInited && 
					<AnketCardList
						sectionId = {section}
					/>
				}
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(AnketsPage)