import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import taskService from '../services/taskService'

// ── Modal ─────────────────────────────────────────────────────────────────────
function EditModal({ task, onClose, onSave }) {
  // FIX: normalize 'pending' → 'Pending' so select default value matches options
  const [title, setTitle] = useState(task.title)
  const [status, setStatus] = useState(
    task.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1).toLowerCase() : 'Pending'
  )
  const [saving, setSaving] = useState(false)
  const inputRef = useRef()

  useEffect(() => { inputRef.current?.focus() }, [])

  const handleSave = async () => {
    if (!title.trim()) { toast.error('Title cannot be empty'); return }
    setSaving(true)
    try {
      // FIX: send lowercase to match what API expects
      await onSave(task.tid, { title: title.trim(), status: status.toLowerCase() })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="card w-full max-w-md p-6 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-700 text-slate-800">Edit task</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-600 text-slate-700 mb-1.5">Task title</label>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="input-field"
              onKeyDown={e => e.key === 'Enter' && handleSave()}
            />
          </div>
          <div>
            <label className="block text-sm font-600 text-slate-700 mb-1.5">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="input-field"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary flex-1">
            {saving ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
            ) : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 className="text-base font-700 text-slate-700 mb-1">No tasks yet</h3>
      <p className="text-sm text-slate-400 mb-5">Add your first task to get started.</p>
      <button onClick={onAdd} className="btn-primary">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add a task
      </button>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const [adding, setAdding] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [filter, setFilter] = useState('All')
  const [deletingId, setDeletingId] = useState(null)
  const inputRef = useRef()

  const fetchTasks = async () => {
    try {
      const res = await taskService.getAll()

      console.log("FULL RESPONSE:", res)
      console.log("DATA:", res.data)

      const raw =
        res.data?.tasks ||
        res.data?.data ||
        res.data

      // FIX: normalize status to Title Case since API returns lowercase ('pending' → 'Pending')
      const data = Array.isArray(raw)
        ? raw.map(t => ({
            ...t,
            status: t.status
              ? t.status.charAt(0).toUpperCase() + t.status.slice(1).toLowerCase()
              : t.status
          }))
        : []

      setTasks(data)

    } catch {
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTasks() }, [])

 const handleAdd = async () => {
  const title = newTitle.trim()

  if (!title) {
    toast.error('Please enter a task title')
    inputRef.current?.focus()
    return
  }

  setAdding(true)

  try {
    // ✅ filter se status decide hoga
    const status =
      filter === 'Completed'
        ? 'completed'
        : 'pending'   // default + All case

    const res = await taskService.create({ 
      title, 
      status 
    })

    const raw = res.data?.data || res.data?.task || res.data

    const created = {
      ...raw,
      status: raw.status?.toLowerCase() || status
    }

    setTasks(prev => [created, ...prev])

    setNewTitle('')
    toast.success('Task added!')
    inputRef.current?.focus()

  } catch (err) {
    console.error(err)
    toast.error('Failed to add task')
  } finally {
    setAdding(false)
  }
}

const handleUpdate = async (id, data) => {
  try {
    const res = await taskService.update(id, data)
    await fetchTasks()
    const updated = res.data?.data
    setTasks(prev =>
      prev.map(t => t.tid === id ? { ...t, ...updated } : t)
    )

    setEditTask(null)
    toast.success('Task updated!')
  } catch (err) {
    console.error(err)
    toast.error('Failed to update task')
  }
}

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await taskService.remove(id)
      setTasks(prev => prev.filter(t => t.tid !== id))
      toast.success('Task deleted')
    } catch {
      toast.error('Failed to delete task')
    } finally {
      setDeletingId(null)
    }
  }

 const handleToggle = async (task) => {
  const current = task.status.toLowerCase()

  const newStatus = current === 'completed' ? 'pending' : 'completed'

  await handleUpdate(task.tid, {
    title: task.title,
    status: newStatus
  })
}

  const safeTasks = Array.isArray(tasks) ? tasks : []

  const filtered = safeTasks.filter(
    t => filter === 'All' || t.status === filter
  )

  return (
    <>
      {editTask && (
        <EditModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={handleUpdate}
        />
      )}

      <div className="space-y-6 animate-slide-up ">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-800 text-slate-800 tracking-tight">Tasks</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage and track all your tasks in one place.</p>
        </div>

        {/* Add task */}
        <div className="card p-4">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="Add a new task… (press Enter)"
              className="input-field flex-1"
            />
            <button
              onClick={handleAdd}
              disabled={adding}
              className="btn-primary px-5 flex-shrink-0"
            >
              {adding ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )}
              Add
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {['All', 'Pending', 'Completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-xl text-sm font-600 transition-all duration-150 ${
                filter === f
                  ? 'bg-brand-600 text-white shadow-brand'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              {f}
              {f !== 'All' && (
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  filter === f ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {/* FIX: use safeTasks instead of tasks to guard against non-array state */}
                  {safeTasks.filter(t => t.status === f).length}
                </span>
              )}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-400 font-500">{filtered.length} task{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Task list */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState onAdd={() => { inputRef.current?.focus() }} />
          ) : (
            <div className="divide-y divide-slate-50">
              {filtered.map((task, i) => {
                const id = task.tid
                const isDone = task.status === 'Completed'
                return (
                  <div
                    key={id}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/70 transition-colors animate-slide-in group"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => handleToggle(task)}
                      className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-150 ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-slate-300 hover:border-brand-400'
                      }`}
                    >
                      {isDone && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    {/* Title */}
                    <span className={`flex-1 text-sm font-500 truncate transition-all ${
                      isDone ? 'line-through text-slate-400' : 'text-slate-700'
                    }`}>
                      {task.title}
                    </span>

                    {/* Status badge */}
                    <span className={`hidden sm:inline-flex text-xs font-600 px-2.5 py-1 rounded-full flex-shrink-0 ${
                      isDone ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {task.status}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditTask(task)}
                        className="p-1.5 hover:bg-brand-50 text-slate-400 hover:text-brand-600 rounded-lg transition-all"
                        title="Edit task"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        disabled={deletingId === id}
                        className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all"
                        title="Delete task"
                      >
                        {deletingId === id ? (
                          <span className="w-4 h-4 border-2 border-red-200 border-t-red-400 rounded-full animate-spin block" />
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}