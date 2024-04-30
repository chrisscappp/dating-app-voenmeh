import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./Sidebar.module.scss"
import React, { memo, useMemo, useState, useEffect, useCallback, CSSProperties } from "react"
import { sidebarItemList } from "../../model/sidebarItems"
import { SidebarItem } from "../SidebarItem/SidebarItem"
import { useHover } from "shared/lib/hooks/useHover"
import LogoutIcon from "shared/assets/icons/logout-icon-sidebar.svg"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { userActions } from "entity/User"
import { useTranslation } from "react-i18next"
import { TranslationKeys } from "shared/config/i18nConfig/translationKeys"
import { useMobile } from "shared/lib/hooks/useMobile"
import { useInView } from "react-intersection-observer"

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
	
	const [ isHover, bindHover ] = useHover()
	const [ isIconsFixed, setIsIconsFixed ] = useState<boolean>(true)
	const [ isIconsStatic, setIsIconsStatic ] = useState<boolean>(false)
	const mobile = useMobile()
	const dispatch = useAppDispatch()
	const { t } = useTranslation(TranslationKeys.SIDEBAR)

	const { ref, inView } = useInView()

	const {
		className
	} = props

	useEffect(() => {
		if (!mobile && inView) {
			setIsIconsFixed(false)
			setIsIconsStatic(true)
		} else {
			setIsIconsFixed(true)
			setIsIconsStatic(false)
		}
	}, [inView, mobile])

	const routes = useMemo(() => {
		return Object.values(sidebarItemList).map(item => {
			return (
				<SidebarItem
					item={item}
					collapsed={isHover}
					key = {item.path}
					className = {cls.sideBarItem}
					isMobile = {mobile}
				/>
			)
		})
	}, [isHover, mobile])

	const onLogout = useCallback(() => {
		dispatch(userActions.logout())
	}, [dispatch])

	const mods: Mods = {
		[cls.collapsed]: isHover,
		[cls.mobile]: mobile
	}

	const iconsWrapMods: Mods = {
		[cls.fixed]: !mobile ? isIconsFixed : false
	}

	const staticStyles: CSSProperties = {
		position: "absolute",
		bottom: "100px"
	}
	
	return (
		<div className = {classNames(cls.Sidebar, mods, [className])}>
			<div {...bindHover} style = {isIconsStatic ? staticStyles : {}} className = {classNames(!mobile ? cls.iconsWrap : "", iconsWrapMods, [])}>
				<div className = {cls.icons}>
					{routes}
					{!mobile && <div className = {classNames(cls.logoutIcon, {}, [cls.sideBarItem])} onClick = {onLogout}>
						<LogoutIcon/>
						{isHover && 
						<Text
							text = {t("Выйти")}
							className = {cls.logoutText}
							theme = {TextTheme.SECONDARY}
						/>}
					</div>}
				</div>
			</div>
			{!mobile && 
			<div 
				className = {cls.test}
				ref = {ref}
			></div>}
		</div>
	)
})