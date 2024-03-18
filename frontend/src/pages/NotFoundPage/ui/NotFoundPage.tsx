import { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"

const NotFoundPage = () => {
	
	const { t } = useTranslation(TranslationKeys.NOT_FOUND_PAGE)
	
	return (
		<div>
			{t("Страница не найдена")}
		</div>
	)
}

export default memo(NotFoundPage)