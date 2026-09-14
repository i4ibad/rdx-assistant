import React, { useMemo, useState } from 'react'
import { CheckCircle2, Circle, ChevronDown } from 'lucide-react'
import { setupChecklist as initialChecklist } from '../data/mockData.js'

export default function SetupChecklist({ navigate }) {
  const [checklist, setChecklist] = useState(initialChecklist)
  const [expandedId, setExpandedId] = useState(null)

  const percentComplete = useMemo(() => {
    const done = checklist.filter((step) => step.done).length
    return Math.round((done / checklist.length) * 100)
  }, [checklist])

  function toggleStep(id) {
    setChecklist((prev) =>
      prev.map((step) => (step.id === id ? { ...step, done: !step.done } : step))
    )
  }

  return (
    <div className="card p-4 sm:p-5">
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-md font-extrabold text-slate-900">Platform Setup Checklist</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Follow the 7 steps to deploy your AI chatbot to production.
          </p>
        </div>
        <span className="badge font-bold shrink-0 bg-brand-50 text-brand-700">
          {percentComplete}% Complete
        </span>
      </div>

      <div className="my-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-brand-600 transition-all duration-500"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      <ul className="divide-y divide-slate-100">
        {checklist.map((step) => {
          const isExpanded = expandedId === step.id
          return (
            <li key={step.id} className="py-2.5">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleStep(step.id)}
                  className="mt-0.5 shrink-0 text-brand-600"
                  aria-label={step.done ? 'Mark step incomplete' : 'Mark step complete'}
                >
                  {step.done ? (
                    <CheckCircle2 size={18} strokeWidth={2} />
                  ) : (
                    <Circle size={18} strokeWidth={2} className="text-slate-300" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : step.id)}
                  className="flex-1 text-left"
                >
                  <p
                    className={`text-sm font-medium ${
                      step.done ? 'text-slate-400 line-through' : 'text-slate-800'
                    }`}
                  >
                    {step.id}. {step.title}
                  </p>
                  {isExpanded ? (
                    <p className="mt-1 text-xs text-slate-500">{step.detail}</p>
                  ) : null}
                </button>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => navigate(step.target)}
                    className="rounded-md px-2 py-1 text-xs font-medium text-brand-600 hover:bg-brand-50"
                  >
                    Configure
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : step.id)}
                    className="rounded-md p-1 text-slate-400 hover:bg-slate-100"
                    aria-label="Toggle details"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
