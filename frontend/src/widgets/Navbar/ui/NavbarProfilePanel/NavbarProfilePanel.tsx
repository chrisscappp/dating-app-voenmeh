import { classNames } from "shared/lib/classNames/classNames"
import cls from "./NavbarProfilePanel.module.scss"
import ProfileIcon from "shared/assets/icons/profile-icon.svg"
import NotificationsIcon from "shared/assets/icons/notifications-icon.svg"
import LogoutIcon from "shared/assets/icons/logout-icon.svg"
import { memo } from "react"

interface NavbarProfilePanelProps {
	className?: string;
	onLogout?: () => void;
}

export const NavbarProfilePanel = memo((props: NavbarProfilePanelProps) => {
	
	const {
		className,
		onLogout
	} = props
	
	return (
		<div className = {classNames(cls.NavbarProfilePanel, {}, [className])}>
			<div className = {cls.content}>
				<div className = {cls.iconWrap}><ProfileIcon/></div>
				<div className = {cls.iconWrap}>
					<NotificationsIcon/>
					<div className = {cls.badge}></div>
				</div>
				<div className = {cls.iconWrap} onClick = {onLogout}><LogoutIcon/></div>
			</div>
		</div>
	)
})