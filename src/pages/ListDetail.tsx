import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

import {
	getTasksByList,
	createTask,
	toggleTaskDone,
	deleteTask,
	Task,
} from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog"

export default function ListDetail() {
	const { id } = useParams<{ id: string }>()
	const [tasks, setTasks] = useState<Task[]>([])
	const [loading, setLoading] = useState(true)
	const [newTask, setNewTask] = useState("")
	const [creating, setCreating] = useState(false)
	const [confirmingDeleteTaskId, setConfirmingDeleteTaskId] = useState<
		number | null
	>(null)
	const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null)

	const fetchTasks = async () => {
		try {
			const data = await getTasksByList(id!)
			setTasks(data)
		} catch {
			toast.error("Error al cargar tareas")
		} finally {
			setLoading(false)
		}
	}

	const handleAddTask = async () => {
		if (!newTask.trim()) return
		setCreating(true)
		try {
			const task = await createTask(id!, newTask)
			setTasks((prev) => [...prev, task])
			setNewTask("")
			toast.success("Tarea agregada")
		} catch {
			toast.error("No se pudo agregar la tarea")
		} finally {
			setCreating(false)
		}
	}

	const handleToggle = async (task: Task) => {
		try {
			await toggleTaskDone(task.id, !task.done)
			setTasks((prev) =>
				prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
			)
		} catch {
			toast.error("Error al actualizar tarea")
		}
	}

	const handleDelete = async (taskId: number) => {
		setDeletingTaskId(taskId)
		try {
			await deleteTask(taskId)
			setTasks((prev) => prev.filter((t) => t.id !== taskId))
			toast.success("Tarea eliminada")
		} catch {
			toast.error("Error al eliminar tarea")
		} finally {
			setDeletingTaskId(null)
			setConfirmingDeleteTaskId(null)
		}
	}

	useEffect(() => {
		fetchTasks()
	}, [id])

	return (
		<div className="container max-w-3xl py-12">
			<h1 className="mb-8 text-center text-4xl font-bold tracking-tight">
				Tareas de la lista
			</h1>

			{/* Formulario para nueva tarea */}
			<div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<Input
					placeholder="Nueva tarea..."
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					className="w-full bg-white/60 shadow backdrop-blur-md dark:bg-zinc-900/40 sm:w-96"
				/>
				<Button onClick={handleAddTask} disabled={creating}>
					{creating ? "Agregando..." : "Agregar"}
				</Button>
			</div>

			{/* Lista de tareas */}
			{loading ? (
				<div className="space-y-4">
					{[...Array(4)].map((_, i) => (
						<Skeleton key={i} className="h-14 w-full rounded-lg" />
					))}
				</div>
			) : tasks.length === 0 ? (
				<p className="text-center text-lg text-muted-foreground">
					No hay tareas aún en esta lista.
				</p>
			) : (
				<div className="space-y-3">
					{tasks.map((task) =>
						deletingTaskId === task.id ? (
							<Skeleton key={task.id} className="h-14 w-full rounded-xl" />
						) : (
							<Card
								key={task.id}
								className="flex items-center justify-between gap-4 rounded-2xl bg-white/60 p-4 backdrop-blur transition hover:shadow-md dark:bg-zinc-900/40"
							>
								<div className="flex items-center gap-3">
									<Checkbox
										checked={task.done}
										onCheckedChange={() => handleToggle(task)}
									/>
									<span
										className={`text-base ${
											task.done ? "text-muted-foreground line-through" : ""
										}`}
									>
										{task.title}
									</span>
								</div>

								<Dialog
									open={confirmingDeleteTaskId === task.id}
									onOpenChange={(open) => {
										if (!open) setConfirmingDeleteTaskId(null)
									}}
								>
									<DialogTrigger asChild>
										<Button
											size="sm"
											variant="destructive"
											onClick={(e) => {
												e.stopPropagation()
												setConfirmingDeleteTaskId(task.id)
											}}
										>
											Eliminar
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>¿Eliminar tarea?</DialogTitle>
										</DialogHeader>
										<p className="text-sm text-muted-foreground">
											¿Estás seguro de que deseas eliminar la tarea{" "}
											<b>{task.title}</b>? Esta acción no se puede deshacer.
										</p>
										<DialogFooter>
											<Button
												variant="outline"
												onClick={() => setConfirmingDeleteTaskId(null)}
											>
												Cancelar
											</Button>
											<Button
												variant="destructive"
												onClick={() => handleDelete(task.id)}
												disabled={deletingTaskId === task.id}
											>
												{deletingTaskId === task.id
													? "Eliminando..."
													: "Eliminar"}
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</Card>
						),
					)}
				</div>
			)}
		</div>
	)
}
