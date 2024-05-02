import { classNames } from "shared/lib/classNames/classNames"
import cls from "./NavbarProfilePanel.module.scss"
import ProfileIcon from "shared/assets/icons/profile-icon.svg"
import NotificationsIcon from "shared/assets/icons/notifications-icon.svg"
import LogoutIcon from "shared/assets/icons/logout-icon.svg"
import React, { memo, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useSelector } from "react-redux"
import { getUserAuthData } from "entity/User"
import { useTranslation } from "react-i18next"
import { fetchNotifications, getNotificationsError, getNotificationsIsLoading, getNotificationsList, NotificationsModal, removeNotifications } from "feautures/Notifications"
import { Portal } from "shared/ui/Portal/Portal"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"

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
	const dispatch = useAppDispatch()
	const notifications = useSelector(getNotificationsList)
	const error = useSelector(getNotificationsError)
	const isLoading = useSelector(getNotificationsIsLoading)
	const [ isOpen, setIsOpen ] = useState<boolean>(false)

	useEffect(() => {
		dispatch(fetchNotifications())
	}, [dispatch])

	const onOpenModal = useCallback(() => {
		setIsOpen(true)
	}, [])

	const onCloseModal = useCallback(() => {
		setIsOpen(false)
	}, [])

	const onNavigateToProfile = () => {
		navigate(`/profile/${authData?.userId}`)
	}

	const onViewNotifications = useCallback(async () => {
		const response = await dispatch(removeNotifications())
		if (response.meta.requestStatus === "fulfilled") {
			onCloseModal()
		}
	}, [dispatch, onCloseModal])
	
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
					onClick = {onOpenModal}
				>
					<NotificationsIcon/>
					{
						notifications && notifications.length > 0 
							? 
							<div className = {cls.badge}></div> 
							: null
					}
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
			{
				isOpen &&
				<Portal>
					<NotificationsModal
						notifications = {notifications ? notifications : []}
						error = {error ? error : ""}
						isLoading = {isLoading ? isLoading : false}
						removeNotifications = {onViewNotifications}
						isOpen = {isOpen}
						onClose = {onCloseModal}
					/>
				</Portal>
			}
		</div>
	)
})