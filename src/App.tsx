import { useRoutes } from "react-router-dom"
import PrivateRoute from "@/components/PrivateRoute"

import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Dashboard from "@/pages/Dashboard"
import ListDetail from "@/pages/ListDetail"
import { Toaster } from "sonner"
import { TailwindIndicator } from "./components/tailwind-indicator"

const routes = [
	{ path: "/", element: <Login /> },
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{
		element: <PrivateRoute />,
		children: [
			{ path: "/dashboard", element: <Dashboard /> },
			{ path: "/lists/:id", element: <ListDetail /> },
		],
	},
]

function App() {
	const children = useRoutes(routes)

	return (
		<>
			<div className="relative flex min-h-screen flex-col">
				<div className="flex-1">{children}</div>
			</div>
			<Toaster richColors position="top-center" />
			<TailwindIndicator />
		</>
	)
}

export default App
