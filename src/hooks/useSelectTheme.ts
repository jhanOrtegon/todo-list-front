import { useState, useEffect } from "react"

type Theme = "dark" | "light" | "system"

const useTheme = (
	defaultTheme: Theme = "system",
	storageKey: string = "vite-ui-theme",
) => {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	)

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove("light", "dark")
		let effectiveTheme = theme

		if (theme === "system") {
			effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light"
		}

		root.classList.add(effectiveTheme)

		localStorage.setItem(storageKey, effectiveTheme)
	}, [theme, storageKey])

	return { theme, setTheme }
}

export default useTheme
