import React, { memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Page } from "widgets/Page"
import cls from "./SymphatyPage.module.scss"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { SymphatyAnketsList, symphatyAnketsReducer} from "entity/Anket"
import { useStore } from "react-redux"

const reducers: ReducersList = {
	symphatyAnkets: symphatyAnketsReducer
}

const SymphatyPage = () => {

	const { t } = useTranslation()
	const [ anketsInited, setAnketsInited ] = useState<boolean>(false)

	const store = useStore()
	useEffect(() => {
		const state: ReducersList = store.getState()
		
		if (state.symphatyAnkets) {
			setAnketsInited(true)
		}
	}, [store])
	
	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page>
				<div className = {cls.header}>
					<Text
						text = {t("Мои симпатии")}
						theme = {TextTheme.PRIMARY}
						size = {TextSize.L}
					/>
				</div>
				{
					anketsInited && <SymphatyAnketsList/>
				}
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(SymphatyPage)