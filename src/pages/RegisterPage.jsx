import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'user' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Minimum 6 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await register(form.name.trim(), form.email, form.password, form.role)
      toast.success('Account created! Please sign in.')
      navigate('/login')
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(msg)
      setErrors({ api: msg })
    } finally {
      setLoading(false)
    }
  }

  const Field = ({ label, name, type = 'text', placeholder, autoComplete }) => (
    <div>
      <label className="block text-sm font-600 text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`input-field ${errors[name] ? 'border-red-300 focus:ring-red-400' : ''}`}
      />
      {errors[name] && <p className="mt-1.5 text-xs text-red-500">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-600 rounded-2xl mb-4 shadow-brand">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-800 text-slate-800 tracking-tight">Create account</h1>
          <p className="text-slate-500 mt-1 text-sm">Start managing your tasks today</p>
        </div>

        {/* Card */}
        <div className="card p-8">
          {errors.api && (
            <div className="mb-5 flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Field label="Full name" name="name" placeholder="Jane Smith" autoComplete="name" />
            <Field label="Email address" name="email" type="email" placeholder="jane@example.com" autoComplete="email" />

            <div>
              <label className="block text-sm font-600 text-slate-700 mb-1.5">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Field label="Password" name="password" type="password" placeholder="Min. 6 characters" autoComplete="new-password" />
            <Field label="Confirm password" name="confirmPassword" type="password" placeholder="Repeat your password" autoComplete="new-password" />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </>
              ) : 'Create account'}
            </button>
          </form>
        </div>

        <p className="text-center mt-5 text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 font-600 hover:text-brand-700 transition-colors">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  )
}
