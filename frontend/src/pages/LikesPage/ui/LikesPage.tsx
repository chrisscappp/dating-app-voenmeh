import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Page } from "widgets/Page"
import cls from "./LikesPage.module.scss"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { AnketsList, anketsListReducer } from "entity/Anket"
import { useReducerInited } from "shared/lib/hooks/useReducerInited"
import { AnketsEndpoints } from "shared/config/anketsListConfig/anketsListConfig"

const reducers: ReducersList = {
	anketsList: anketsListReducer
}

const LikesPage = () => {

	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)
	const inited = useReducerInited("anketsList")
	
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
					inited && 
					<AnketsList
						endpoint = {AnketsEndpoints.LIKE_ANKETS}
						questionBtn
						crossBtn
					/>
				}
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(LikesPage)