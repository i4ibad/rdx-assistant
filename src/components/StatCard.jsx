import React from 'react'
import { ArrowUpRight, Minus, AlertTriangle } from 'lucide-react'

const trendStyles = {
  up: 'text-emerald-600 bg-emerald-50',
  neutral: 'text-slate-500 bg-slate-100',
  warn: 'text-amber-600 bg-amber-50'
}

const trendIcon = {
  up: ArrowUpRight,
  neutral: Minus,
  warn: AlertTriangle
}

export default function StatCard({ stat }) {
  const Icon = trendIcon[stat.trendDirection] ?? Minus

  return (
    <div className="card flex flex-col gap-3 p-4">
      <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
      <p className="text-2xl font-bold tracking-tight text-slate-900">{stat.value}</p>

      {typeof stat.progress === 'number' ? (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-brand-600 transition-all"
            style={{ width: `${stat.progress}%` }}
          />
        </div>
      ) : null}

      <div
        className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
          trendStyles[stat.trendDirection]
        }`}
      >
        <Icon size={11} />
        {stat.trend}
      </div>
    </div>
  )
}
