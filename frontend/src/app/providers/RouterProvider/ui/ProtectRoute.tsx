import { getUserAuthData } from "entities/User"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router"
import { routerPath } from "shared/config/routeConfig/routeConfig"

interface ProtecredRouteProps {
	children?: JSX.Element;
}

export function ProtectedRoute({ children }: ProtecredRouteProps) {
	const auth = useSelector(getUserAuthData)
	const location = useLocation()

	if (!auth) {
		return <Navigate to = {routerPath.main} state = {{from: location}} replace/>
	}

	return children
}