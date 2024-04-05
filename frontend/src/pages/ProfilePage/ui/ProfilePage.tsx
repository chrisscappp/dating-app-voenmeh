import { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { classNames } from "shared/lib/classNames/classNames"
import { Sidebar } from "widgets/Sidebar"
import cls from "./ProfilePage.module.scss"
import { Page } from "widgets/Page"

const ProfilePage = () => {
	
	//const { t } = useTranslation(TranslationKeys.ABOUT_PAGE)
	
	return (
		<Page className = {classNames(cls.ProfilePage, {}, [])}>
			prilfe page
		</Page>
	)
}

export default memo(ProfilePage)