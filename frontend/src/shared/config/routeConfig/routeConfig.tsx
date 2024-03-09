import { RouteProps } from "react-router"
import { MainPage } from "pages/MainPage"
import { AboutPage } from "pages/AboutPage"
import { NotFoundPage } from "pages/NotFoundPage"

export enum AppRoutes {
	MAIN = "main",
	ABOUT = "about",
	NOT_FOUND = "not_found"
}

export const routerPath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: "/",
	[AppRoutes.ABOUT]: "/about",
	[AppRoutes.NOT_FOUND]: "*"
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: routerPath.main,
		element: <MainPage/>
	},
	[AppRoutes.ABOUT]: {
		path: routerPath.about,
		element: <AboutPage/>
	},
	//last
	[AppRoutes.NOT_FOUND]: {
		path: routerPath.not_found,
		element: <NotFoundPage/>
	}
}