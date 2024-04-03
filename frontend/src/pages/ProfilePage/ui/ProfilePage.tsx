import { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { classNames } from "shared/lib/classNames/classNames"
import { Sidebar } from "widgets/Sidebar"
import cls from "./ProfilePage.module.scss"

const ProfilePage = () => {
	
	//const { t } = useTranslation(TranslationKeys.ABOUT_PAGE)
	
	return (
		<div className = {classNames(cls.ProfilePage, {}, [])}>
			{/* <Sidebar/> */}
			prilfe page
		</div>
	)
}

export default memo(ProfilePage)