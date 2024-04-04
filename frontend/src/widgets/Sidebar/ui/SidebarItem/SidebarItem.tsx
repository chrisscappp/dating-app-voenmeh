import { classNames } from "shared/lib/classNames/classNames"
import cls from "./SidebarItem.module.scss"
import { memo } from "react"
import { SidebarItemType } from "widgets/Sidebar/model/types"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"

interface SidebarItemProps {
	className?: string;
	item: SidebarItemType;
	collapsed?: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	
	const {
		className,
		item,
		collapsed
	} = props
	
	return (
		<AppLink 
			className = {classNames(cls.SidebarItem, {[cls.collapsed]: !collapsed}, [className])}
			to = {item.path}
			theme = {AppLinkTheme.SECONDARY}
		>
			<item.Icon className = {cls.icon}/>
			<span className = {cls.link}>
				{item.text}
			</span>
		</AppLink>
	)
})