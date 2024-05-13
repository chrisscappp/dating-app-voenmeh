import { classNames } from "shared/lib/classNames/classNames"
import cls from "./SidebarItem.module.scss"
import React, { memo } from "react"
import { SidebarItemType } from "widgets/Sidebar/model/types"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { useLocation } from "react-router"

interface SidebarItemProps {
	className?: string;
	item: SidebarItemType;
	collapsed?: boolean;
	isMobile?: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	
	const {
		className,
		item,
		collapsed,
		isMobile
	} = props

	const { t } = useTranslation(TranslationKeys.SIDEBAR)
	const location = useLocation()
	
	const onScrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	const onOpenSupport = () => {
		if (item.text === "Тех поддержка") {
			window.open("https://vk.com/chrisscapp", "_blank")
		}
	}

	return (
		<span onClick = {onScrollTop}>
			<AppLink 
				className = {classNames(cls.SidebarItem, {[cls.collapsed]: !collapsed}, [className])}
				to = {!item.path ? location.pathname : item.path}
				theme = {AppLinkTheme.SECONDARY}
				onClick = {onOpenSupport}
			>
				<item.Icon className = {cls.icon}/>
				{ !isMobile && <span className = {cls.link}>
					{t(item.text)}
				</span> }
			</AppLink>
		</span>
		
	)
})