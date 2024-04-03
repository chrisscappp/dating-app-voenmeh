import { Suspense, useCallback, useMemo } from "react"
import { Route, Routes } from "react-router-dom"
import { AppRouteProps, routeConfig } from "shared/config/routeConfig/routeConfig"
import { Footer } from "widgets/Footer"
import { PageLoader } from "widgets/PageLoader"
import { ProtectedRoute } from "./ProtectRoute"

export const AppRouter = () => {

	const renderWithWrapper = useCallback((route: AppRouteProps) => {
		const element = (
			<Suspense fallback = {<PageLoader/>}>
				<div 
					className = {"page-wrapper"}
				>
					{route.element}
				</div>
			</Suspense>
		)

		return (
			<>
				<Route
					key = {route.path}
					path = {route.path}
					element = { route.authOnly ? <ProtectedRoute>{element}</ProtectedRoute> : element }
				/>
			</>
		)
	}, [])

	return (
		<>
			<Suspense fallback = {<PageLoader/>}>
				<Routes>
					{Object.values(routeConfig).map(renderWithWrapper)}
				</Routes>
				<Footer/>
			</Suspense>
		</>
	)
}