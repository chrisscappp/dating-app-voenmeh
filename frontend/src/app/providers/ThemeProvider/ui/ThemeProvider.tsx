import { FC, ReactNode, useMemo, useState } from "react"
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes } from "../lib/themeContext"

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.LIGHT

interface ThemeProviderProps {
	initialTheme?: Themes;
	children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
	
	const {
		children,
		initialTheme
	} = props

	const [theme, setTheme] = useState<Themes>(initialTheme || defaultTheme)

	const defaultProps = useMemo(() => ({
		theme: theme,
		setTheme: setTheme
	}), [theme]) // мемоизируем переменную в памяти

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider