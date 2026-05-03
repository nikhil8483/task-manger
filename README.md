# TaskFlow — Task Manager Frontend

A clean, professional React frontend for a Task Manager application with JWT authentication, role-based access, and full CRUD operations.

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** | UI library with functional components & hooks |
| **React Router v6** | Client-side routing & protected routes |
| **Axios** | HTTP client with JWT interceptor |
| **Tailwind CSS** | Utility-first styling |
| **react-hot-toast** | Toast notifications |
| **Vite** | Build tool & dev server |

## Project Structure

```
src/
├── components/
│   ├── DashboardLayout.jsx   # Sidebar + navbar shell
│   └── LoadingScreen.jsx     # Full-page loader
├── context/
│   └── AuthContext.jsx       # JWT auth state (login/register/logout)
├── pages/
│   ├── LoginPage.jsx         # /login
│   ├── RegisterPage.jsx      # /register
│   ├── DashboardPage.jsx     # /dashboard (stats overview)
│   └── TasksPage.jsx         # /tasks (full CRUD)
├── routes/
│   └── ProtectedRoute.jsx    # JWT guard for private routes
├── services/
│   ├── api.js                # Axios instance + interceptors
│   └── taskService.js        # Task API calls
├── App.jsx                   # Router setup
├── main.jsx                  # Entry point
└── index.css                 # Global styles + Tailwind
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set your backend URL:
```
VITE_API_URL=http://localhost:5000/api/v1
```

### 3. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
```

## API Integration

The app expects these endpoints on your backend:

### Auth
| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/auth/register` | `{ name, email, password, role }` | `{ message }` |
| POST | `/auth/login` | `{ email, password }` | `{ token, user }` |

### Tasks (JWT required)
| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| GET | `/tasks` | — | `{ tasks: [...] }` or `[...]` |
| POST | `/tasks` | `{ title, status }` | `{ task }` or task object |
| PUT | `/tasks/:id` | `{ title, status }` | `{ task }` or task object |
| DELETE | `/tasks/:id` | — | `{ message }` |

> The app handles both `{ tasks: [...] }` and plain `[...]` response shapes.

## Features

- **JWT Auth**: Token stored in `localStorage`, auto-attached to every request via Axios interceptor
- **Protected Routes**: Unauthorized users redirected to `/login` automatically
- **Auto logout**: 401 responses globally trigger logout + redirect
- **Form validation**: All inputs validated client-side before API calls
- **Loading states**: Spinners on every async action
- **Toast notifications**: Success/error feedback on all operations
- **Empty state**: Friendly message when no tasks exist
- **Responsive**: Mobile-friendly sidebar with overlay
- **Task toggle**: Click checkbox to toggle Pending ↔ Completed inline

## Customization

- **Colors**: Edit `tailwind.config.js` → `colors.brand` to change the accent color
- **API base URL**: Set `VITE_API_URL` in `.env`
- **Task fields**: Extend the task object in `TasksPage.jsx` and `taskService.js`
