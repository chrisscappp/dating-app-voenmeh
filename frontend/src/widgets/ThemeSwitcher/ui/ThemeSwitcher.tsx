import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ThemeSwitcher.module.scss"
import { useTheme } from "app/providers/ThemeProvider";
import { Themes } from "app/providers/ThemeProvider/lib/themeContext";

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {

	const { toggleTheme } = useTheme()

	const {
		className
	} = props

	return (
		<div className = {classNames(cls.ThemeSwitcher, {}, [className])}>
			<input 
				type="checkbox" 
				id="switch" 
			/>
			<label 
				htmlFor="switch"
				onClick = {() => toggleTheme(Themes.DARK)}
			>Toggle</label>
		</div>
	)
}