import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import cls from "./MainPageTitle.module.scss"
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextAlign, TextSize, TextTheme } from "shared/ui/Text/Text";

interface MainPageTitleProps {
	className?: string;
}

export const MainPageTitle = memo((props: MainPageTitleProps) => {
	
	const { t } = useTranslation(TranslationKeys.MAIN_PAGE)
	const title = "Заголовок 1"
	const subTitle = "Заголовок 2"

	const {
		className
	} = props
	
	return (
		<div className = {classNames(cls.MainPageTitle, {}, [className])}>
			<div className = {cls.titleWrap}>
				<Text
					title = {t(title)}
					theme = {TextTheme.PRIMARY}
					size = {TextSize.XXL}
					align = {TextAlign.CENTER}
					className = {cls.mainTitle}
				/>
			</div>
			<div className = {cls.subTitleWrap}>
				<Text
					text = {t(subTitle)}
					size = {TextSize.L}
					theme = {TextTheme.PRIMARY}
					align = {TextAlign.CENTER}
					className = {cls.subTitle}
				/>
			</div>
		</div>
	)
})
