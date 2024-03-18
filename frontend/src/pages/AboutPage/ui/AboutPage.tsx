import { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"

const AboutPage = () => {
	
	const { t } = useTranslation(TranslationKeys.ABOUT_PAGE)
	
	return (
		<div>
			{t("Страница о нас")}
		</div>
	)
}

export default memo(AboutPage)