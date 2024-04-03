import { Button, ButtonTheme } from "shared/ui/Button/Button"
import cls from "./NavbarButtons.module.scss"
import { Themes } from "app/providers/ThemeProvider"
import { useTranslation } from "react-i18next"

interface NavbarButtonsProps {
	handleOpenLoginModal: () => void; 
	handleOpenRegisterModal: () => void;
	theme: Themes;
}

export const NavbarButtons = ({ handleOpenLoginModal, handleOpenRegisterModal, theme }: NavbarButtonsProps) => {
	
	const { t } = useTranslation()
	
	return (
		<div className = {cls.buttons}>
			<Button
				theme = {ButtonTheme.OUTLINE}
				hovered
				onClick = {handleOpenLoginModal}
			>
				{t("Войти")}
			</Button>
			<Button
				theme = {
					theme === Themes.LIGHT ? ButtonTheme.BACKGROUND : ButtonTheme.BACKGROUND_INVERTED_TEXT
				}
				hovered
				onClick = {handleOpenRegisterModal}
			>
				{t("Регистрация")}
			</Button>
		</div>
	)
}