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

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
	
	const [ isHover, bindHover ] = useHover()
	const [ scrollValue, setScrollValue ] = useState<number>(0)
	const [ isIconsFixed, setIsIconsFixed ] = useState<boolean>(true)
	const [ isIconsStatic, setIsIconsStatic ] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const { t } = useTranslation(TranslationKeys.SIDEBAR)

	const {
		className
	} = props

	const onSetScrollValue = (value: number) => {
		setScrollValue(value)
	}

	useEffect(() => {
		window.addEventListener("scroll", () => onSetScrollValue(pageYOffset))
		return (
			window.removeEventListener("scroll", () => onSetScrollValue(pageYOffset))
		)
	}, [])

	useEffect(() => {
		console.log("SCROLL VAL", scrollValue)
		console.log("window", window.outerHeight)
		if (scrollValue >= window.screen.height) {
			setIsIconsFixed(false)
			setIsIconsStatic(true)
		} else {
			setIsIconsFixed(true)
			setIsIconsStatic(false)
		}
	}, [scrollValue])

	const routes = useMemo(() => {
		return Object.values(sidebarItemList).map(item => {
			return (
				<SidebarItem
					item={item}
					collapsed={isHover}
					key = {item.path}
					className = {cls.sideBarItem}
				/>
			)
		})
	}, [isHover])

	const onLogout = useCallback(() => {
		dispatch(userActions.logout())
	}, [dispatch])

	const mods: Mods = {
		[cls.collapsed]: isHover
	}

	const iconsMods: Mods = {
		[cls.fixed]: isIconsFixed,
	}

	const staticStyles: CSSProperties = {
		marginTop: window.screen.height
	}
	
	return (
		<div className = {classNames(cls.Sidebar, mods, [className])}>
			<div {...bindHover} style = {isIconsStatic ? staticStyles : {}} className = {classNames(cls.iconsWrap, iconsMods, [])}>
				<div className = {cls.icons}>
					{routes}
					<div className = {cls.logoutIcon} onClick = {onLogout}>
						<LogoutIcon/>
						{isHover && 
						<Text
							text = {t("Выйти")}
							className = {cls.logoutText}
							theme = {TextTheme.SECONDARY}
						/>}
					</div>
				</div>
			</div>
		</div>
	)
})