import { AnketCardList } from "entity/Anket"
import React, { memo } from "react"
import { useParams } from "react-router"
import { Page } from "widgets/Page"
import cls from "./AnketsPageDetail.module.scss"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"

const AnketsPage = () => {
	
	const { sectionType: section } = useParams()
	const { t } = useTranslation(TranslationKeys.ANKETS_PAGE)

	return (
		<Page className = {cls.AnketsPageDetail}>
			<div className = {cls.header}>
				<Text
					text = {t("Категория") + t(section as string)}
					theme = {TextTheme.PRIMARY}
					size = {TextSize.L}
				/>
			</div>
			<AnketCardList/>
		</Page>
	)
}

export default memo(AnketsPage)