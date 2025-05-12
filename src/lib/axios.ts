import axios from "axios"

export const API = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
})

API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

API.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			console.warn("Sesión expirada o inválida")
			localStorage.removeItem("token")
			localStorage.removeItem("user")
			window.location.href = "/"
		}
		return Promise.reject(error)
	},
)

export default API
