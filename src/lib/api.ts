import API from "./axios"

export interface List {
	id: number
	title: string
}

export interface Task {
	id: number
	title: string
	done: boolean
	listId: number
	createdAt: string
	updatedAt: string
}

// ============================
// Listas
// ============================

export const getLists = async (): Promise<List[]> => {
	const res = await API.get("/lists")
	return res.data
}

export const createList = async (title: string): Promise<List> => {
	const res = await API.post("/lists", { title })
	return res.data
}

export const deleteList = async (id: number): Promise<void> => {
	await API.delete(`/lists/${id}`)
}

// ============================
// Tareas
// ============================

export const getTasksByList = async (listId: string): Promise<Task[]> => {
	const res = await API.get(`/tasks/list/${listId}`)
	return res.data
}

export const createTask = async (
	listId: string,
	title: string,
): Promise<Task> => {
	const res = await API.post(`/tasks`, { listId: +listId, title })
	return res.data
}

export const toggleTaskDone = async (
	taskId: number,
	done: boolean,
): Promise<void> => {
	await API.patch(`/tasks/${taskId}/toggle`, { done })
}

export const deleteTask = async (taskId: number): Promise<void> => {
	await API.delete(`/tasks/${taskId}`)
}
