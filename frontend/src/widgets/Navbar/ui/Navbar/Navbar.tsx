import { classNames } from "shared/lib/classNames/classNames"
import LogoIconLight from "shared/assets/icons/logo-light.svg"
import LogoIconDark from "shared/assets/icons/logo-dark.svg"
import { NavbarPanel } from "../NavbarPanel/NavbarPanel"
import cls from "./Navbar.module.scss"
import { useTheme } from "app/providers/ThemeProvider"
import { Themes } from "app/providers/ThemeProvider"
import { NavbarButtons } from "../NavbarButtons/NavbarButtons"
import { LoginModal } from "feautures/Login"
import { RegisterModal } from "feautures/Register"
import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { getUserAuthData } from "entities/User"
import { NavbarProfilePanel } from "../NavbarProfilePanel/NavbarProfilePanel"
import { userActions } from "entities/User"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"

interface NavbarProps {
	className?: string;
}

export const Navbar = (props: NavbarProps) => {

	const { theme } = useTheme()
	const dispatch = useAppDispatch()
	const auth = useSelector(getUserAuthData)

	const [ isOpenLoginModal, setIsOpenLoginModal ] = useState<boolean>(false)
	const [ isOpenRegisterModal, setIsOpenRegisterModal ] = useState<boolean>(false)

	const handleOpenLoginModal = useCallback(() => {
		setIsOpenLoginModal(true)
	}, [])

	const handleCloseLoginModal = useCallback(() => {
		setIsOpenLoginModal(false)
	}, [])

	const handleOpenRegisterModal = useCallback(() => {
		setIsOpenRegisterModal(true)
	}, [])

	const handleCloseRegisterModal = useCallback(() => {
		setIsOpenRegisterModal(false)
	}, [])

	const onLogout = useCallback(() => {
		dispatch(userActions.logout())
	}, [dispatch])

	const {
		className
	} = props

	return (
		<div className = {classNames(cls.Navbar, {}, [className])}>
			<div className = {cls.content}>
				<div className = {cls.rightSide}>
					{
						theme === Themes.LIGHT ?
							<LogoIconLight className = {cls.icon}/>
							: 
							<LogoIconDark className = {cls.icon}/>
					}
					<NavbarPanel
						theme = {theme}
					/>
				</div>
				{ !auth ? 
					<NavbarButtons
						handleOpenLoginModal = {handleOpenLoginModal}
						handleOpenRegisterModal = {handleOpenRegisterModal}
						theme = {theme}
					/> 
					: 
					<NavbarProfilePanel 
						className = {cls.navbarProfilePanel}
						onLogout={onLogout}
					/>
				}
				
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