import { classNames } from "shared/lib/classNames/classNames"
import { SectionKeys } from "../../model/config"
import cls from "./AnketsSectionItem.module.scss"
import { CSSProperties } from "react"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { useTranslation } from "react-i18next"
import { Button } from "shared/ui/Button/Button"
import { Themes, useTheme } from "app/providers/ThemeProvider"
import { useNavigate } from "react-router"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"

interface AnketsSectionItemProps {
	className?: string;
	section: SectionKeys
}

export const AnketsSectionItem = (props: AnketsSectionItemProps) => {

	const {
		className,
		section
	} = props

	const { t } = useTranslation(TranslationKeys.SECTIONS_PAGE)
	const { theme } = useTheme()
	const navigate = useNavigate()

	const styles: CSSProperties = {
		background: theme === Themes.LIGHT ? section.gradient : section.gradientDark
	}

	const onSwitchSection = () => {
		navigate(`/ankets/${section.type}`)
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	return (
		<Button 
			className = {classNames(cls.AnketsSectionItem, {}, [className])}
			style = {styles}
			onClick = {onSwitchSection}
		>
			<Text
				text = {t(section.title)}
				theme = {TextTheme.PRIMARY}
			/>
		</Button>
	)
}