export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <a href="/" className="fixed top-3 left-3 z-50 text-xs text-zinc-600 hover:text-zinc-400 transition-colors px-2 py-1 rounded-md hover:bg-zinc-800/50">← Hub</a>
      {children}
    </div>
  )
}
