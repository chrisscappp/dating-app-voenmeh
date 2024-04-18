import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Page } from "widgets/Page"

const AboutPage = () => {
	
	const { t } = useTranslation(TranslationKeys.ABOUT_PAGE)
	
	return (
		<Page>
			{t("Страница о нас")}
		</Page>
	)
}

export default memo(AboutPage)