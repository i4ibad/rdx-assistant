import React, { useEffect, useMemo, useState } from 'react'
import { Search, CornerDownLeft } from 'lucide-react'
import { commandItems } from '../data/mockData.js'

export default function CommandPalette({ open, onClose, navigate }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const results = useMemo(() => {
    if (!query.trim()) return commandItems
    return commandItems.filter((item) =>
      item.label.toLowerCase().includes(query.trim().toLowerCase())
    )
  }, [query])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActiveIndex(0)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, results.length - 1))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (event.key === 'Enter' && results[activeIndex]) {
        event.preventDefault()
        navigate(results[activeIndex].id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, results, activeIndex, navigate])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24">
      <div
        className="absolute inset-0 bg-slate-900/40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative z-10 w-full max-w-lg animate-scale-in overflow-hidden rounded-xl border border-slate-200 bg-white shadow-popover"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
          <Search size={16} className="text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or jump to..."
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
            Esc
          </kbd>
        </div>

        <div className="scrollbar-thin max-h-72 overflow-y-auto p-1.5">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-slate-400">No results found.</p>
          ) : (
            <>
              <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Navigate
              </p>
              {results.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => navigate(item.id)}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm ${
                    index === activeIndex
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {index === activeIndex ? (
                    <CornerDownLeft size={13} className="text-brand-500" />
                  ) : null}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
