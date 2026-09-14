import React from 'react'
import { Construction } from 'lucide-react'
import { pageTitles } from '../data/mockData.js'

export default function Placeholder({ pageId, navigate }) {
  return (
    <div className="animate-fade-in flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Construction size={22} />
      </span>
      <h1 className="text-lg font-semibold text-slate-900">{pageTitles[pageId]}</h1>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">
        This section mirrors the source app&apos;s navigation target. Wire your real data and
        components into this route the same way Overview and Integrations are built.
      </p>
      <button
        type="button"
        onClick={() => navigate('overview')}
        className="btn-primary mt-5"
      >
        Back to Overview
      </button>
    </div>
  )
}
