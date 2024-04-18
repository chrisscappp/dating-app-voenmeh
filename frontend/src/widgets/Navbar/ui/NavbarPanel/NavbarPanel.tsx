import { classNames } from "shared/lib/classNames/classNames"
import LanguageIconLight from "shared/assets/icons/language-light.svg"
import LanguageIconDark from "shared/assets/icons/language-dark.svg"
import ThemeIconLight from "shared/assets/icons/theme-light.svg"
import ThemeIconDark from "shared/assets/icons/theme-dark.svg"
import cls from "./NavbarPanel.module.scss"
import { useTranslation } from "react-i18next"
import { LangSwitcher } from "widgets/LangSwitcher"
import { ThemeSwitcher } from "widgets/ThemeSwitcher"
import { Themes } from "app/providers/ThemeProvider"
import React, { memo } from "react"

interface NavbarPanelProps {
	className?: string;
	theme: Themes;
}

export const NavbarPanel = memo((props: NavbarPanelProps) => {

	const { t } = useTranslation()

	const {
		className,
		theme
	} = props

	return (
		<div className = {classNames(cls.NavbarPanel, {}, [className])}>
			<div className = {cls.theme}>
				{
					theme === Themes.LIGHT ? 
						<ThemeIconLight/>
						:
						<ThemeIconDark/>
				}
				<ThemeSwitcher/>
			</div>
			<div className = {cls.lang}>
				{
					theme === Themes.LIGHT ? 
						<LanguageIconLight/>
						:
						<LanguageIconDark/>
				}
				<LangSwitcher/>
			</div>
		</div>
	)
})