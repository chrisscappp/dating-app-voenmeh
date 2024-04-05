import { Mods, classNames } from "shared/lib/classNames/classNames"
import cls from "./ThemeSwitcher.module.scss"
import { useTheme } from "app/providers/ThemeProvider"
import { Themes } from "app/providers/ThemeProvider/lib/themeContext"
import React, { CSSProperties, MutableRefObject, useEffect, useRef, useState } from "react"

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {

	const { toggleTheme, theme } = useTheme()
	const [ isSwitched, setIsSwitched ] = useState(false)

	const {
		className
	} = props

	const ref = useRef() as MutableRefObject<CSSProperties>

	useEffect(() => {
		if (theme === "app_dark_theme") {
			setIsSwitched(true)
		}
	}, [theme])

	const onSwitch = () => {
		toggleTheme(Themes.DARK)
		setIsSwitched(!isSwitched)
		if (isSwitched) {
			ref.current.transform = "translateX(26px)"
		} else {
			ref.current = {}
		}
	}

	const mods: Mods = {
		[cls.dark]: theme === Themes.DARK,
		[cls.round]: true,
		[cls.bgSwithed]: isSwitched
	}

	return (
		<div className = {classNames(cls.ThemeSwitcher, {}, [className])}>
			<label className={cls.switch}>
				<input 
					type="checkbox" 
					onClick = {onSwitch}
				/>
				<span 
					className={classNames(cls.slider, mods, [])}
				>
					<div
						//@ts-ignore
						ref = {ref}
						className = {classNames(cls.ball, {[cls.isSwitched]: isSwitched}, [])}>
					</div>
				</span>
			</label>
		</div>
	)
}