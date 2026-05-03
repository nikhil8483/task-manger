export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-[3px] border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-400 font-medium">Loading…</p>
      </div>
    </div>
  )
}
