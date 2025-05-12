import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import API from "@/lib/axios"

const loginSchema = z.object({
	email: z.string().email("Correo inválido"),
	password: z.string().min(6, "La contraseña es obligatoria"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data: LoginFormData) => {
		try {
			const response = await API.post("/auth/login", data)
			const { access_token, ...user } = response.data

			localStorage.setItem("token", access_token)
			localStorage.setItem("user", JSON.stringify(user))

			toast.success("Sesión iniciada", {
				description: `Bienvenido, ${user.name}`,
			})

			navigate("/dashboard")
		} catch (error: any) {
			toast.error("Error al iniciar sesión", {
				description: error.response?.data?.message || "Credenciales inválidas.",
			})
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted px-4 py-12">
			<Card className="w-full max-w-sm shadow-lg">
				<CardHeader>
					<CardTitle className="text-center text-2xl">Iniciar sesión</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-1">
							<Label htmlFor="email">Correo electrónico</Label>
							<Input id="email" type="email" {...register("email")} />
							{errors.email && (
								<p className="text-sm text-red-500">{errors.email.message}</p>
							)}
						</div>

						<div className="space-y-1">
							<Label htmlFor="password">Contraseña</Label>
							<Input id="password" type="password" {...register("password")} />
							{errors.password && (
								<p className="text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>

						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? "Ingresando..." : "Entrar"}
						</Button>
					</form>

					<p className="mt-4 text-center text-sm text-muted-foreground">
						¿No tienes cuenta?{" "}
						<a href="/register" className="underline">
							Regístrate
						</a>
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
