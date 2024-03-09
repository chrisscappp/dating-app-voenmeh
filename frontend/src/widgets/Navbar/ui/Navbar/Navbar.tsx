import { classNames } from "shared/lib/classNames/classNames"
import LogoIconLight from "shared/assets/icons/logo-light.svg"
import LogoIconDark from "shared/assets/icons/logo-dark.svg"
import { NavbarPanel } from "../NavbarPanel/NavbarPanel"
import cls from "./Navbar.module.scss"
import { useTheme } from "app/providers/ThemeProvider"
import { Themes } from "app/providers/ThemeProvider"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button"
import { useTranslation } from "react-i18next"

interface NavbarProps {
	className?: string;
}

export const Navbar = (props: NavbarProps) => {

	const { theme } = useTheme()
	const { t } = useTranslation()

	const {
		className
	} = props

	return (
		<div className = {classNames(cls.Navbar, {}, [className])}>
			<div className = {cls.content}>
				<div className = {cls.rightSide}>
					{
						theme === Themes.LIGHT ?
							<LogoIconLight/>
						: 
							<LogoIconDark/>
					}
					<NavbarPanel
						theme = {theme}
					/>
				</div>
				<div className = {cls.leftSide}>
					<Button
						theme = {ButtonTheme.OUTLINE}
						hovered
					>
						{t("Войти")}
					</Button>
					<Button
						theme = {
							theme === Themes.LIGHT ? ButtonTheme.BACKGROUND : ButtonTheme.BACKGROUND_INVERTED_TEXT
						}
						hovered
					>
						{t("Регистрация")}
					</Button>
				</div>
			</div>
		</div>
	)
}