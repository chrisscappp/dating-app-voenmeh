import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { Page } from "widgets/Page"

const NotFoundPage = () => {
	
	const { t } = useTranslation(TranslationKeys.NOT_FOUND_PAGE)
	
	return (
		<Page>
			{t("Страница не найдена")}
		</Page>
	)
}

export default memo(NotFoundPage)