import { classNames } from "shared/lib/classNames/classNames"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button"
import cls from "./LangSwitcher.module.scss"
import { useTranslation } from "react-i18next"
import React from "react"

interface LangSwitcherProps {
	className?: string;
}

export const LangSwitcher = (props: LangSwitcherProps) => {

	const { t, i18n } = useTranslation()

	const {
		className
	} = props

	const changeLanguage = () => {
		i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
	}

	return (
		<Button
			theme = {ButtonTheme.CLEAR}
			size = {ButtonSize.M}
			className = {classNames(cls.LangSwitcher, {}, [className])}
			onClick = {changeLanguage}
			hovered
		>
			{t("Язык")}
		</Button>
	)
}