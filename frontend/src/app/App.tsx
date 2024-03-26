import { classNames } from "shared/lib/classNames/classNames"
import { useTheme } from "./providers/ThemeProvider"
import "./styles/reset.scss"
import "./styles/index.scss"
import { useTranslation } from "react-i18next";
import { Navbar } from "widgets/Navbar/index"
import { Suspense, useEffect } from "react"
import { AppRouter } from "./providers/RouterProvider"

const App = () => {

	const { theme } = useTheme()

	return (
		<div className = {classNames("app", {}, [theme])}>
			<Navbar/>
			{/* {для i18n} */}
			<Suspense fallback = "">
				<div className = "content-page">
					<AppRouter/>
				</div>
			</Suspense>
		</div>
	)
}

export default App