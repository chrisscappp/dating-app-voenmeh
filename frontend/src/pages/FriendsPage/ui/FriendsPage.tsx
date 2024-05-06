import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Page } from "widgets/Page"
import cls from "./FriendsPage.module.scss"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { AnketsList, anketsListReducer } from "entity/Anket"
import { useAnketsListInited } from "shared/lib/hooks/useAnketsListInited"
import { AnketsEndpoints } from "shared/config/anketsListConfig/anketsListConfig"

const reducers: ReducersList = {
	anketsList: anketsListReducer
}

const FriendsPage = () => {

	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)
	const inited = useAnketsListInited()
	
	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page>
				<div className = {cls.header}>
					<Text
						text = {t("Мои друзья")}
						theme = {TextTheme.PRIMARY}
						size = {TextSize.L}
					/>
				</div>
				{
					inited &&
					<AnketsList
						endpoint = {AnketsEndpoints.FRIENDS_ANKETS}
						questionBtn
						vkBtn
						telegramBtn
					/>
				}
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(FriendsPage)