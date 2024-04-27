import { AnketCardList, anketsPageReducer } from "entity/Anket"
import React, { memo, useEffect, useState } from "react"
import { useParams } from "react-router"
import { Page } from "widgets/Page"
import cls from "./AnketsPageDetail.module.scss"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useStore } from "react-redux"
import { anketsPageActions } from "entity/Anket/model/slice/anketsSlice"
import { StateSchema } from "app/providers/StoreProvider"

const reducers: ReducersList = {
	ankets: anketsPageReducer
}

const AnketsPage = () => {
	
	const { sectionType: section } = useParams<{ sectionType: string }>()
	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)
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
			<Page className = {cls.AnketsPageDetail}>
				<div className = {cls.header}>
					<Text
						text = {t("Категория") + t(section as string)}
						theme = {TextTheme.PRIMARY}
						size = {TextSize.L}
					/>
				</div>
				{anketsInited && 
				<AnketCardList
					sectionId = {section}
				/>}
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(AnketsPage)