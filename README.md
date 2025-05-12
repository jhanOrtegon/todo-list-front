# 📝 Todo List App

Aplicación de lista de tareas construida como una SPA moderna con **Vite + React + TypeScript**, utilizando **TailwindCSS**, **ShadCN UI** y validaciones robustas. Este proyecto está pensado para ser escalable, modular y fácil de mantener.

---

## 🚀 Tecnologías

- ⚛️ **React 18** con **Vite**
- 📘 **TypeScript**
- 🎨 **TailwindCSS**
- 🧩 **ShadCN UI**
- ✅ **React Hook Form** + **Zod** para validaciones
- 🐳 **Docker** (usando **Node 20**) para ambiente de desarrollo

---

## 🖼️ Vistas del Frontend

El proyecto es una **Single Page Application (SPA)** con las siguientes rutas:

| Ruta         | Descripción                                    |
| ------------ | ---------------------------------------------- |
| `/`          | Formulario de acceso                           |
| `/login`     | Formulario de acceso                           |
| `/register`  | Formulario de registro                         |
| `/dashboard` | Vista general con todas las listas creadas     |
| `/lists/:id` | Vista detallada de tareas por lista específica |

---

## 🔧 Instalación y uso

### Opción 1: Usando Docker (recomendado)

```bash
docker compose up --build -d
```

Esto levanta automáticamente el contenedor con todo configurado.

### Opción 2: Entorno local (sin Docker)

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/todo-list.git
cd todo-list
```

2. Instala las dependencias:

```bash
yarn install
```

3. Inicia el servidor de desarrollo:

```bash
yarn dev
```

4. Accede a la app en [http://localhost:5173](http://localhost:5173)

---

## 📦 Scripts disponibles

```bash
yarn dev           # Inicia el servidor de desarrollo (Vite)
yarn build         # Compila la app para producción
yarn preview       # Previsualiza el build de producción
yarn lint          # Linter con ESLint
```

---

## 🧱 Estructura del proyecto

```bash
src/
├── pages/            # Vistas de cada ruta (SPA)
├── components/       # Componentes reutilizables
├── hooks/            # Hooks personalizados
├── lib/              # Validaciones, utilidades, helpers
├── styles/           # Configuración de Tailwind y estilos globales
├── app/              # Configuracion de rutas globales
└── main.tsx          # Entrada principal
```

---

## ✨ Características principales

- ✅ Registro y login con validación robusta
- 🗂️ Crear, editar y eliminar listas de tareas
- 📝 Vista individual por lista para gestionar tareas
- 🌙 Soporte para dark mode (gracias a ShadCN + Tailwind)
- 🔒 Preparado para autenticación con JWT

---
