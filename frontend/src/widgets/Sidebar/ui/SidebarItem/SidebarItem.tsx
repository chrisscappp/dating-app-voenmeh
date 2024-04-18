import { classNames } from "shared/lib/classNames/classNames"
import cls from "./SidebarItem.module.scss"
import React, { memo } from "react"
import { SidebarItemType } from "widgets/Sidebar/model/types"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"

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

	const { t } = useTranslation(TranslationKeys.SIDEBAR)
	
	const onScrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	return (
		<span onClick = {onScrollTop}>
			<AppLink 
				className = {classNames(cls.SidebarItem, {[cls.collapsed]: !collapsed}, [className])}
				to = {item.path}
				theme = {AppLinkTheme.SECONDARY}
			>
				<item.Icon className = {cls.icon}/>
				<span className = {cls.link}>
					{t(item.text)}
				</span>
			</AppLink>
		</span>
		
	)
})