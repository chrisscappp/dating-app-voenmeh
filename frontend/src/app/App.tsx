import { classNames } from "shared/lib/classNames/classNames"
import { useTheme } from "./providers/ThemeProvider"
import { Navbar } from "widgets/Navbar/index"
import React, { Suspense, useEffect, useState} from "react"
import { AppRouter } from "./providers/RouterProvider"
import "./styles/reset.scss"
import "./styles/index.scss"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { userActions, getUserAuthInited, getUserAuthData } from "entity/User"
import { useSelector } from "react-redux"
import { Sidebar } from "widgets/Sidebar"
import { useObserver } from "shared/lib/hooks/useObserver"
import { useMobile } from "shared/lib/hooks/useMobile"

const App = () => {

	const { theme } = useTheme()
	const dispatch = useAppDispatch()
	const initedAuthData = useSelector(getUserAuthInited)
	const authData = useSelector(getUserAuthData)
	const mobile = useMobile()
	
	useEffect(() => {
		dispatch(userActions.initAuthData())
	}, [dispatch])

	return (
		<div className = {classNames("app", {}, [theme])}>
			<Navbar/>
			<Suspense fallback = "">
				<div className = {!mobile ? "content-page" : ""}>
					{authData && initedAuthData && <Sidebar/>}
					{initedAuthData && <AppRouter/>}
				</div>
			</Suspense>
		</div>
	)
}

export default App