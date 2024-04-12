import { classNames } from "shared/lib/classNames/classNames"
import cls from "./NavbarProfilePanel.module.scss"
import ProfileIcon from "shared/assets/icons/profile-icon.svg"
import NotificationsIcon from "shared/assets/icons/notifications-icon.svg"
import LogoutIcon from "shared/assets/icons/logout-icon.svg"
import React, { memo } from "react"
import { useNavigate } from "react-router"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useSelector } from "react-redux"
import { getUserAuthData } from "entity/User"
import { useTranslation } from "react-i18next"

interface NavbarProfilePanelProps {
	className?: string;
	onLogout?: () => void;
}

export const NavbarProfilePanel = memo((props: NavbarProfilePanelProps) => {
	
	const {
		className,
		onLogout
	} = props

	const { t } = useTranslation()
	const navigate = useNavigate()
	const authData = useSelector(getUserAuthData)

	const onNavigateToProfile = () => {
		navigate(`/profile/${authData?.userId}`)
	}
	
	return (
		<div className = {classNames(cls.NavbarProfilePanel, {}, [className])}>
			<div className = {cls.content}>
				<Button
					theme = {ButtonTheme.CLEAR}
					className = {cls.iconWrap}
					onClick = {onNavigateToProfile}
					title = {t("Профиль подсказка")}
				>
					<ProfileIcon/>
				</Button>
				<Button 
					theme = {ButtonTheme.CLEAR}
					className = {cls.iconWrap}
					title = {t("Уведомления подсказка")}
				>
					<NotificationsIcon/>
					<div className = {cls.badge}></div>
				</Button>
				<Button 
					theme = {ButtonTheme.CLEAR}
					className = {cls.iconWrap} 
					onClick = {onLogout}
					title = {t("Выйти подсказка")}
				>
					<LogoutIcon/>
				</Button>
			</div>
		</div>
	)
})