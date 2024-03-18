import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { Footer } from "widgets/Footer";

export const AppRouter = () => {
	return (
		<>
			<Suspense fallback = {<h3>Loading...</h3>}>
				<Routes>
					{Object.values(routeConfig).map(({ path, element }) => {
						return (
							<Route
								key = {path}
								path = {path}
								element = {
									<div className = "page-wrapper">{element}</div>
								}
							/>
						)
					})}
				</Routes>
				<Footer/>
			</Suspense>
		</>
	)
}