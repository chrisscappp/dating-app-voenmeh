import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./Sidebar.module.scss"
import { memo, useState } from "react"
import { sidebarItemList } from "../../model/sidebarItems"
import { SidebarItemType } from "../../model/types"
import { SidebarItem } from "../SidebarItem/SidebarItem"
import { useHover } from "shared/lib/hooks/useHover"

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
	
	const [ collapsed, setCollapsed ] = useState<boolean>(true)
	const [ isHover, bindHover ] = useHover()

	const {
		className
	} = props

	const mods: Mods = {
		[cls.collapsed]: isHover
	}
	
	return (
		<div className = {classNames(cls.Sidebar, mods, [className])}>
			<div {...bindHover} className = {cls.iconsWrap}>
				<div className = {cls.icons}>
					{Object.values(sidebarItemList).map(item => {
						return (
							<SidebarItem
								item={item}
								collapsed={isHover}
								key = {item.path}
								className = {cls.sideBarItem}
							/>
						)
					})}
				</div>
				
			</div>
		</div>
	)
})