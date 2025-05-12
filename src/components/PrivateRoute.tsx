import { Navigate, Outlet } from "react-router-dom"
import { SiteHeader } from "./site-header"

export default function PrivateRoute() {
	const token = localStorage.getItem("token")

	return token ? (
		<>
			<SiteHeader />
			<Outlet />
		</>
	) : (
		<Navigate to="/" replace />
	)
}
