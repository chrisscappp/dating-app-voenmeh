import { useContext } from "react"
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes } from "./themeContext"

interface UseThemeResult {
	toggleTheme: (th: Themes) => void;
	theme: Themes
}

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext)

	const toggleTheme = (_: Themes) => {
		const newTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT
		setTheme?.(newTheme)
		//document.body.className = newTheme
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
	}

	return { 
		theme: theme || Themes.LIGHT, 
		toggleTheme 
	}
}