import { useEffect, useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
	const navigate = useNavigate()
	const location = useLocation()
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		setIsLoggedIn(!!localStorage.getItem("token"))
	}, [location.pathname])

	const handleLogout = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("user")
		setIsLoggedIn(false)
		navigate("/")
	}

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-2 overflow-x-auto text-sm text-muted-foreground">
					<Link to="/dashboard" className="hover:underline">
						Dashboard
					</Link>
				</div>

				<nav className="flex items-center space-x-2">
					<ModeToggle />
					{isLoggedIn && (
						<Button variant="ghost" size="sm" onClick={handleLogout}>
							Cerrar sesión
						</Button>
					)}
				</nav>
			</div>
		</header>
	)
}
