import { classNames } from "shared/lib/classNames/classNames"
import LogoIconLight from "shared/assets/icons/logo-light.svg"
import LogoIconDark from "shared/assets/icons/logo-dark.svg"
import { NavbarPanel } from "../NavbarPanel/NavbarPanel"
import cls from "./Navbar.module.scss"
import { useTheme } from "app/providers/ThemeProvider"
import { Themes } from "app/providers/ThemeProvider"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useTranslation } from "react-i18next"
import { LoginModal } from "feautures/Login"
import { RegisterModal } from "feautures/Register"
import { useCallback, useState } from "react"

interface NavbarProps {
	className?: string;
}

export const Navbar = (props: NavbarProps) => {

	const { theme } = useTheme()
	const { t } = useTranslation()

	const [ isOpenLoginModal, setIsOpenLoginModal ] = useState<boolean>(false)
	const [ isOpenRegisterModal, setIsOpenRegisterModal ] = useState<boolean>(false)

	const handleOpenLoginModal = useCallback(() => {
		setIsOpenLoginModal(true)
	}, [isOpenLoginModal])

	const handleCloseLoginModal = useCallback(() => {
		setIsOpenLoginModal(false)
	}, [isOpenLoginModal])

	const handleOpenRegisterModal = useCallback(() => {
		setIsOpenRegisterModal(true)
	}, [isOpenLoginModal])

	const handleCloseRegisterModal = useCallback(() => {
		setIsOpenRegisterModal(false)
	}, [isOpenLoginModal])

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
			</div>
			{
				isOpenLoginModal &&
				<LoginModal
					isOpen = {isOpenLoginModal}
					onClose = {handleCloseLoginModal}
				/>
			}
			{
				isOpenRegisterModal &&
				<RegisterModal
					isOpen = {isOpenRegisterModal}
					onClose = {handleCloseRegisterModal}
				/>
			}
		</div>
	)
}