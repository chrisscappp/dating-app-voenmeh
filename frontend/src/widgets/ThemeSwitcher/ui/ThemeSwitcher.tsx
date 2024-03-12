import { Mods, classNames } from "shared/lib/classNames/classNames"
import cls from "./ThemeSwitcher.module.scss"
import { useTheme } from "app/providers/ThemeProvider";
import { Themes } from "app/providers/ThemeProvider/lib/themeContext";
import { CSSProperties, useEffect, useState } from "react";

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {

	const { toggleTheme, theme } = useTheme()
	const [styles, setStyles] = useState<CSSProperties>()
	const [stylesInput, setStylesInput] = useState<CSSProperties>()

	const {
		className
	} = props

	const mods: Mods = {
		[cls.dark]: theme === Themes.DARK,
		[cls.round]: true
	}

	return (
		<div className = {classNames(cls.ThemeSwitcher, {}, [className])}>

			<label className={cls.switch}>
  			<input 
				type="checkbox" 
				onClick = {() => toggleTheme(Themes.DARK)}
				
			/>
  			<span 
				className={classNames(cls.slider, mods, [])}
			></span>
			</label>

		</div>
	)
}