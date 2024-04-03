import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import cls from "./MainPageDescription.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextAlign, TextSize, TextTheme } from "shared/ui/Text/Text"

interface MainPageDescriptionProps {
	className?: string;
}

export const MainPageDescription = memo((props: MainPageDescriptionProps) => {
	
	const { t } = useTranslation(TranslationKeys.MAIN_PAGE)

	const {
		className
	} = props
	
	return (
		<div className = {classNames(cls.MainPageDescription, {}, [className])}>
			<div>
				<div className = {cls.titleWrap}>
					<Text
						title = {t("Ключевое приложение")}
						size = {TextSize.XXL}
						align = {TextAlign.CENTER}
						theme = {TextTheme.SECONDARY}
						className = {cls.mainTitle}
					/>
				</div>
				<div className = {cls.subTitleWrap}>
					<Text
						text = {t("Текст ключевое приложение")}
						size = {TextSize.L}
						align = {TextAlign.CENTER}
						theme = {TextTheme.SECONDARY}
						className = {cls.subTitle}
					/>
				</div>
			</div>	
		</div>
	)
})
