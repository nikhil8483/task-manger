import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import taskService from '../services/taskService'

function StatCard({ label, value, color, icon }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-800 text-slate-800">{value}</p>
        <p className="text-xs text-slate-500 font-500">{label}</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  taskService.getAll()
    .then(res => {
      const data = res.data?.data || res.data
      setTasks(Array.isArray(data) ? data : [])
    })
    .catch(() => setTasks([]))
    .finally(() => setLoading(false))
}, [])

const safeTasks = Array.isArray(tasks) ? tasks : []

const total = safeTasks.length
const completed = safeTasks.filter(t => t.status?.toLowerCase() === 'completed').length
const pending = safeTasks.filter(t => t.status?.toLowerCase() === 'pending').length
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-800 text-slate-800 tracking-tight">
          {greeting}, {user?.name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Here's an overview of your tasks for today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total tasks"
          value={loading ? '—' : total}
          color="bg-brand-50 text-brand-600"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
        <StatCard
          label="Completed"
          value={loading ? '—' : completed}
          color="bg-emerald-50 text-emerald-600"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Pending"
          value={loading ? '—' : pending}
          color="bg-amber-50 text-amber-600"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Completion rate"
          value={loading ? '—' : `${completionRate}%`}
          color="bg-violet-50 text-violet-600"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>

      {/* Progress bar */}
      {!loading && total > 0 && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-600 text-slate-700">Overall Progress</h3>
            <span className="text-sm font-700 text-brand-600">{completionRate}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-700"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">{completed} of {total} tasks completed</p>
        </div>
      )}

      {/* Quick actions */}
      <div className="card p-5">
        <h3 className="text-sm font-600 text-slate-700 mb-4">Quick actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/tasks" className="btn-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add new task
          </Link>
          <Link to="/tasks" className="btn-secondary">
            View all tasks →
          </Link>
        </div>
      </div>

      {/* Recent tasks */}
      {!loading && tasks.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-600 text-slate-700">Recent tasks</h3>
            <Link to="/tasks" className="text-xs text-brand-600 font-600 hover:text-brand-700">View all →</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {tasks.slice(0, 5).map(task => (
              <div key={task._id || task.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                <span className="text-sm text-slate-700 font-500 truncate">{task.title}</span>
                <span className={`text-xs font-600 px-2.5 py-1 rounded-full flex-shrink-0 ${
                  task.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
