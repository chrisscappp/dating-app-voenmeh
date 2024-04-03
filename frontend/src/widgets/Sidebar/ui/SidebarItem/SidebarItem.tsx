import { classNames } from "shared/lib/classNames/classNames"
import cls from "./SidebarItem.module.scss"
import { memo } from "react"
import { SidebarItemType } from "widgets/Sidebar/model/types"
import { AppLink } from "shared/ui/AppLink/AppLink"

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
		<div className = {classNames(cls.SidebarItem, {[cls.collapsed]: !collapsed}, [className])}>
			<item.Icon/>
			{!collapsed ? null :
				<AppLink 
					className = {cls.link}
					to = {item.path}
				>
					{item.text}
				</AppLink>}
		</div>
	)
})