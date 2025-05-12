import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { getLists, createList, List, deleteList } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"

export default function Dashboard() {
	const [lists, setLists] = useState<List[]>([])
	const [loading, setLoading] = useState(true)
	const [newListName, setNewListName] = useState("")
	const [creating, setCreating] = useState(false)
	const [deletingId, setDeletingId] = useState<number | null>(null)
	const [openDialogListId, setOpenDialogListId] = useState<number | null>(null)

	const navigate = useNavigate()

	const fetchLists = async () => {
		try {
			const data = await getLists()
			setLists(data)
		} catch (err) {
			toast.error("Error al cargar listas", {
				description: "Verifica tu conexión o sesión.",
			})
		} finally {
			setLoading(false)
		}
	}

	const handleCreateList = async () => {
		if (!newListName.trim()) return
		setCreating(true)
		try {
			const newList = await createList(newListName)
			setLists((prev) => [...prev, newList])
			setNewListName("")
			toast.success("Lista creada correctamente")
		} catch (err) {
			toast.error("No se pudo crear la lista")
		} finally {
			setCreating(false)
		}
	}

	const handleDelete = async (id: number) => {
		setDeletingId(id)
		try {
			await deleteList(id)
			setLists((prev) => prev.filter((list) => list.id !== id))
			toast.success("Lista eliminada correctamente")
		} catch (err) {
			toast.error("No se pudo eliminar la lista")
		} finally {
			setDeletingId(null)
			setOpenDialogListId(null)
		}
	}

	useEffect(() => {
		fetchLists()
	}, [])

	return (
		<div className="container max-w-5xl py-12">
			<h1 className="mb-10 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
				Gestión de tus Listas
			</h1>

			{/* Formulario de nueva lista */}
			<div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<Input
					placeholder="Nueva lista..."
					value={newListName}
					onChange={(e) => setNewListName(e.target.value)}
					className="w-full bg-white/60 shadow-md backdrop-blur-md dark:bg-zinc-900/40 sm:w-80"
				/>
				<Button
					onClick={handleCreateList}
					disabled={creating}
					className="shadow-md"
				>
					{creating ? "Creando..." : "Crear lista"}
				</Button>
			</div>

			{/* Listado de listas */}
			{loading ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{[...Array(3)].map((_, i) => (
						<Skeleton key={i} className="h-28 rounded-2xl" />
					))}
				</div>
			) : lists.length === 0 ? (
				<p className="text-center text-lg text-muted-foreground">
					Aún no has creado ninguna lista.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{lists.map((list) => (
						<Card
							key={list.id}
							className="cursor-pointer rounded-2xl border border-border bg-white/50 backdrop-blur-sm transition hover:scale-[1.02] hover:shadow-xl dark:bg-zinc-900/50"
						>
							<CardHeader className="flex cursor-default items-start justify-between">
								<CardTitle
									className="text-xl font-semibold"
									onClick={() => navigate(`/lists/${list.id}`)}
								>
									{list.title}
								</CardTitle>

								<Dialog
									open={openDialogListId === list.id}
									onOpenChange={(open) =>
										setOpenDialogListId(open ? list.id : null)
									}
								>
									<DialogTrigger asChild>
										{deletingId === list.id ? (
											<Skeleton className="h-6 w-6 rounded-full" />
										) : (
											<Button
												variant="ghost"
												size="icon"
												className="text-red-500 hover:text-red-700"
												onClick={(e) => e.stopPropagation()}
											>
												<Trash2 className="h-5 w-5" />
											</Button>
										)}
									</DialogTrigger>

									<DialogContent>
										<DialogHeader>
											<DialogTitle>¿Eliminar esta lista?</DialogTitle>
										</DialogHeader>
										<p className="text-sm text-muted-foreground">
											Esta acción no se puede deshacer. ¿Estás seguro de que
											quieres eliminar <b>{list.title}</b>?
										</p>
										<DialogFooter>
											<Button
												variant="outline"
												onClick={() => setOpenDialogListId(null)}
											>
												Cancelar
											</Button>
											<Button
												variant="destructive"
												onClick={() => handleDelete(list.id)}
												disabled={deletingId === list.id}
											>
												{deletingId === list.id ? "Eliminando..." : "Eliminar"}
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</CardHeader>

							<CardContent
								className="flex items-center p-4 text-muted-foreground hover:bg-muted/50"
								onClick={() => navigate(`/lists/${list.id}`)}
							>
								<div>Ver tareas →</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	)
}
