import { RouteProps } from "react-router"
import { MainPage } from "pages/MainPage"
import { AboutPage } from "pages/AboutPage"
import { NotFoundPage } from "pages/NotFoundPage"
import { ProfilePage } from "pages/ProfilePage"
import { LikesPage } from "pages/LikesPage"
import { SymphatyPage } from "pages/SymphatyPage"
import { FriendsPage } from "pages/FriendsPage"
import { AnketsPage } from "pages/AnketsPage"

export type AppRouteProps = RouteProps & {
	authOnly?: boolean;
}

export enum AppRoutes {
	MAIN = "main",
	ABOUT = "about",
	PROFILE = "profile",
	LIKES = "likes",
	SYMPHATY = "symphaty",
	FRIENDS = "friends",
	ANKETS = "ankets",
	//last
	NOT_FOUND = "not_found"
}

export const routerPath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: "/",
	[AppRoutes.ABOUT]: "/about",
	[AppRoutes.PROFILE]: "/profile/", // + :id
	[AppRoutes.LIKES]: "/likes",
	[AppRoutes.SYMPHATY]: "/symphaty",
	[AppRoutes.FRIENDS]: "/friends",
	[AppRoutes.ANKETS]: "/ankets", // + :type
	//last
	[AppRoutes.NOT_FOUND]: "*"
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	[AppRoutes.MAIN]: {
		path: routerPath.main,
		element: <MainPage/>
	},
	[AppRoutes.ABOUT]: {
		path: routerPath.about,
		element: <AboutPage/>,
	},
	[AppRoutes.PROFILE]: {
		path: routerPath.profile + ":id",
		element: <ProfilePage/>,
		authOnly: true
	},
	[AppRoutes.ANKETS]: {
		path: routerPath.ankets,
		element: <AnketsPage/>,
		authOnly: true
	}, 
	[AppRoutes.LIKES]: {
		path: routerPath.likes,
		element: <LikesPage/>,
		authOnly: true
	},
	[AppRoutes.SYMPHATY]: {
		path: routerPath.symphaty,
		element: <SymphatyPage/>,
		authOnly: true
	},
	[AppRoutes.FRIENDS]: {
		path: routerPath.friends,
		element: <FriendsPage/>,
		authOnly: true
	},
	//last
	[AppRoutes.NOT_FOUND]: {
		path: routerPath.not_found,
		element: <NotFoundPage/>
	}
}