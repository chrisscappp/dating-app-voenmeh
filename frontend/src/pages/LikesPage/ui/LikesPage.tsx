import React, { memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Page } from "widgets/Page"
import cls from "./LikesPage.module.scss"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { likedAnketsReducer, LikedAnketsList } from "entity/Anket"
import { useStore } from "react-redux"

const reducers: ReducersList = {
	likedAnkets: likedAnketsReducer
}

const LikesPage = () => {

	const { t } = useTranslation()
	const [ anketsInited, setAnketsInited ] = useState<boolean>(false)

	const store = useStore()
	useEffect(() => {
		const state: ReducersList = store.getState()
		
		if (state.likedAnkets) {
			setAnketsInited(true)
		}
	}, [store])
	
	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page>
				<div className = {cls.header}>
					<Text
						text = {t("Мои лайки")}
						theme = {TextTheme.PRIMARY}
						size = {TextSize.L}
					/>
				</div>
				{
					anketsInited && <LikedAnketsList/>
				}
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(LikesPage)