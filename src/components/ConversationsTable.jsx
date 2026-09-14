import React, { useState } from 'react'
import { conversations } from '../data/mockData.js'

const sentimentStyles = {
  positive: 'bg-emerald-50 text-emerald-600',
  neutral: 'bg-slate-100 text-slate-500',
  negative: 'bg-rose-50 text-rose-600'
}

const statusStyles = {
  resolved: 'bg-emerald-50 text-emerald-600',
  open: 'bg-blue-50 text-blue-600',
  escalated: 'bg-amber-50 text-amber-600'
}

const channelStyles = {
  shopify: 'bg-emerald-50 text-emerald-700',
  web: 'bg-slate-100 text-slate-600',
  amazon: 'bg-orange-50 text-orange-600'
}

const filters = ['all', 'open', 'resolved', 'escalated']

export default function ConversationsTable({ navigate }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const rows = conversations.filter(
    (c) => activeFilter === 'all' || c.status === activeFilter
  )

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Live Customer Conversations</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Real-time transcripts from Shopify and Web channels.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('conversations')}
          className="btn-primary !py-1.5 text-xs"
        >
          Open Inbox (2 Unread)
        </button>
      </div>

      <div className="flex gap-1 border-b border-slate-100 px-4 pt-3 sm:px-5">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-t-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              activeFilter === filter
                ? 'border-b-2 border-brand-600 text-brand-700'
                : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="text-xs text-slate-400">
              <th className="px-4 py-2.5 font-medium sm:px-5">Customer</th>
              <th className="px-4 py-2.5 font-medium sm:px-5">Last Message</th>
              <th className="px-4 py-2.5 font-medium sm:px-5">Channel</th>
              <th className="px-4 py-2.5 font-medium sm:px-5">Sentiment</th>
              <th className="px-4 py-2.5 font-medium sm:px-5">Status</th>
              <th className="px-4 py-2.5 font-medium sm:px-5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/70">
                <td className="px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-semibold text-brand-700">
                      {row.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {row.customer}
                      </p>
                      <p className="truncate text-xs text-slate-400">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="max-w-[220px] truncate px-4 py-3 text-slate-600 sm:px-5">
                  &ldquo;{row.message}&rdquo;
                </td>
                <td className="px-4 py-3 sm:px-5">
                  <span className={`badge ${channelStyles[row.channel]}`}>{row.channel}</span>
                </td>
                <td className="px-4 py-3 sm:px-5">
                  <span className={`badge ${sentimentStyles[row.sentiment]}`}>
                    {row.sentiment}
                  </span>
                </td>
                <td className="px-4 py-3 sm:px-5">
                  <span className={`badge ${statusStyles[row.status]}`}>{row.status}</span>
                </td>
                <td className="px-4 py-3 text-right sm:px-5">
                  <button
                    type="button"
                    onClick={() => navigate('conversations')}
                    className="text-xs font-medium text-brand-600 hover:text-brand-700"
                  >
                    View Chat
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-400">
                  No conversations match this filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
