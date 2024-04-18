import { classNames } from "shared/lib/classNames/classNames"
import { useTheme } from "./providers/ThemeProvider"
import { Navbar } from "widgets/Navbar/index"
import React, { Suspense, useEffect } from "react"
import { AppRouter } from "./providers/RouterProvider"
import "./styles/reset.scss"
import "./styles/index.scss"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { userActions, getUserAuthInited, getUserAuthData } from "entity/User"
import { useSelector } from "react-redux"
import { Sidebar } from "widgets/Sidebar"

const App = () => {

	const { theme } = useTheme()
	const dispatch = useAppDispatch()
	const initedAuthData = useSelector(getUserAuthInited)
	const authData = useSelector(getUserAuthData)
	
	useEffect(() => {
		dispatch(userActions.initAuthData())
	}, [dispatch])

	return (
		<div className = {classNames("app", {}, [theme])}>
			<Navbar/>
			<Suspense fallback = "">
				<div className = "content-page">
					{authData && initedAuthData && <Sidebar/>}
					{initedAuthData && <AppRouter/>}
				</div>
			</Suspense>
		</div>
	)
}

export default App