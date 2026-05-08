# Task challenge ForIt App

Aplicación full stack para la gestión de tareas. Permite crear, editar, eliminar y filtrar tareas con persistencia de datos.

**Link del proyecto:** [Ver Demo en Vivo](https://forit-challenge-task-7jyoebz0k-danyelsalazars-projects.vercel.app/)
---

## Tecnologías

### Frontend
- React
- CSS
- Diseño responsive (mobile-first)

### Backend
- Node.js
- Express
- SQLite3
- dotenv

---

## Funcionalidades

- Crear tareas
- Editar tareas
- Eliminar tareas
- Marcar como completadas / pendientes
- Filtrar por estado (todas, completas, pendientes)
- Búsqueda por título
- Persistencia de datos con SQLite

---

## Estructura del proyecto

```

/frontend
/backend
README.md

````

---

## Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/danyelsalazar/forit-challenge-task.git
cd forit-challenge-task
````
---

### 2. Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:

```env
PORT=4000
DB_PATH=./database.sqlite
```

Ejecutar servidor:

```bash
npm run dev
```

---

### 3. Frontend

En otra terminal:

```bash
cd frontend
npm install
````

Crear archivo `.env`:

```env
VITE_API_URL=http://localhost:4000/api
```

Ejecutar la aplicación:

```bash
npm run dev
```

---

## API

Base URL:

```
http://localhost:4000/api
```

Endpoints:

* GET `/tasks` → obtener tareas
* POST `/tasks` → crear tarea
* PUT `/tasks/:id` → actualizar tarea
* DELETE `/tasks/:id` → eliminar tarea

## Base de datos

* SQLite
* Archivo local (`database.sqlite`)
* Creación automática de tabla
* Precarga inicial de datos si la base está vacía

---

## Notas

* El archivo `database.sqlite` está ignorado en `.gitignore`
* Uso de consultas SQL parametrizadas
* Manejo de errores básico implementado
* Arquitectura separada entre frontend y backend
