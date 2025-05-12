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

const registerSchema = z.object({
	name: z.string().min(2, "El nombre es obligatorio"),
	email: z.string().email("Correo inválido"),
	password: z.string().min(6, "Mínimo 6 caracteres"),
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function Register() {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	})

	const onSubmit = async (data: RegisterFormData) => {
		try {
			const response = await API.post("/auth/register", data)
			const { token, user } = response.data
			localStorage.setItem("token", token)
			localStorage.setItem("user", JSON.stringify(user))

			toast.success("Registro exitoso")

			navigate("/")
		} catch (error: any) {
			toast.error("Error al registrar", {
				description: error.response?.data?.message || "Intenta nuevamente.",
			})
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted px-4 py-12">
			<Card className="w-full max-w-sm shadow-lg">
				<CardHeader>
					<CardTitle className="text-center text-2xl">Registrarse</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-1">
							<Label htmlFor="name">Nombre</Label>
							<Input id="name" {...register("name")} />
							{errors.name && (
								<p className="text-sm text-red-500">{errors.name.message}</p>
							)}
						</div>

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
							{isSubmitting ? "Registrando..." : "Crear cuenta"}
						</Button>
					</form>

					<p className="mt-4 text-center text-sm text-muted-foreground">
						¿Ya tienes cuenta?{" "}
						<a href="/" className="underline">
							Inicia sesión
						</a>
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
