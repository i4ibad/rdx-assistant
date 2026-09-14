import React, { useMemo, useState } from 'react'
import { DollarSign, MapPin, Search, Send, ShieldAlert, ShoppingBag, Star, UserCheck } from 'lucide-react'
import { conversationStatusFilters, conversationThreads } from '../data/mockData.js'

const statusBadgeStyles = {
  resolved: 'bg-emerald-50 text-emerald-600',
  active_ai: 'bg-brand-50 text-brand-700',
  handed_over: 'bg-amber-50 text-amber-600'
}

const statusBadgeLabel = {
  resolved: 'Resolved',
  active_ai: 'AI Active',
  handed_over: 'Handed Over'
}

let messageIdSeq = 1000

export default function Conversations() {
  const [threads, setThreads] = useState(conversationThreads)
  const [activeFilter, setActiveFilter] = useState('all')
  const [threadSearch, setThreadSearch] = useState('')
  const [selectedId, setSelectedId] = useState(conversationThreads[0]?.id ?? null)
  const [replyText, setReplyText] = useState('')

  const filteredThreads = useMemo(() => {
    return threads.filter((t) => {
      const matchesFilter = activeFilter === 'all' || t.status === activeFilter
      const q = threadSearch.trim().toLowerCase()
      const matchesSearch =
        !q ||
        t.customer.toLowerCase().includes(q) ||
        t.lastMessagePreview.toLowerCase().includes(q)
      return matchesFilter && matchesSearch
    })
  }, [threads, activeFilter, threadSearch])

  const selectedThread = threads.find((t) => t.id === selectedId) ?? null

  function takeOver(threadId) {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, status: 'handed_over', assigned: 'You (Live Agent)' } : t
      )
    )
  }

  function sendReply(event) {
    event.preventDefault()
    const trimmed = replyText.trim()
    if (!trimmed || !selectedThread) return

    setThreads((prev) =>
      prev.map((t) =>
        t.id === selectedThread.id
          ? {
              ...t,
              lastMessagePreview: trimmed,
              lastMessageTime: 'Now',
              messages: [
                ...t.messages,
                { id: messageIdSeq++, sender: 'human', name: t.assigned, time: 'Now', text: trimmed }
              ]
            }
          : t
      )
    )
    setReplyText('')
  }

  return (
    <div className="animate-fade-in flex h-[calc(100vh-6.5rem)] min-h-[560px] flex-col">
      {/* Header */}
      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2.5">
            <span className="badge border border-brand-200 bg-brand-50 text-brand-700">
              Conversations Inbox
            </span>
            <span className="text-sm text-slate-500">{threads.length} Active Threads</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Omnichannel Inbox
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1">
          {conversationStatusFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeFilter === filter.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3-pane layout */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[320px_1fr_300px]">
        {/* Left: thread list */}
        <div className="card flex min-h-0 flex-col overflow-hidden">
          <div className="border-b border-slate-100 p-3">
            <div className="relative">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={threadSearch}
                onChange={(e) => setThreadSearch(e.target.value)}
                placeholder="Search by customer name or text..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div className="scrollbar-thin flex-1 overflow-y-auto">
            {filteredThreads.length === 0 ? (
              <p className="p-5 text-center text-sm text-slate-400">No conversations found.</p>
            ) : (
              filteredThreads.map((thread) => {
                const isSelected = thread.id === selectedId
                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => setSelectedId(thread.id)}
                    className={`w-full border-l-4 px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/60'
                        : 'border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-semibold text-brand-700">
                          {thread.initials}
                        </span>
                        <span className="truncate text-sm font-semibold text-slate-900">
                          {thread.customer}
                        </span>
                      </div>
                      <span className="shrink-0 text-[11px] text-slate-400">
                        {thread.lastMessageTime}
                      </span>
                    </div>
                    <p className="mb-2 truncate text-xs text-slate-500">
                      {thread.lastMessagePreview}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                        {thread.channel}
                      </span>
                      <span className={`badge ${statusBadgeStyles[thread.status]}`}>
                        {statusBadgeLabel[thread.status]}
                      </span>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Middle: transcript */}
        <div className="card flex min-h-0 flex-col overflow-hidden">
          {selectedThread ? (
            <>
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {selectedThread.customer}{' '}
                    <span className="font-normal text-brand-600">({selectedThread.email})</span>
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Assigned:{' '}
                    <span className="font-semibold text-brand-600">{selectedThread.assigned}</span>
                  </p>
                </div>
                {selectedThread.status !== 'handed_over' ? (
                  <button
                    type="button"
                    onClick={() => takeOver(selectedThread.id)}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100"
                  >
                    <UserCheck size={13} />
                    Take Over
                  </button>
                ) : (
                  <span className="badge shrink-0 bg-amber-50 text-amber-600">Handed Over</span>
                )}
              </div>

              <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto bg-slate-50/50 p-4">
                {selectedThread.messages.map((msg) => {
                  if (msg.sender === 'system') {
                    return (
                      <div key={msg.id} className="flex justify-center">
                        <div className="flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[11px] text-brand-700">
                          <ShieldAlert size={12} />
                          <span className="font-mono">{msg.text}</span>
                        </div>
                      </div>
                    )
                  }
                  const isOutgoing = msg.sender === 'bot' || msg.sender === 'human'
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-xl px-3.5 py-2.5 ${
                          isOutgoing
                            ? 'rounded-tr-sm bg-brand-600 text-white'
                            : 'rounded-tl-sm bg-white text-slate-700 shadow-card'
                        }`}
                      >
                        <div
                          className={`mb-1 flex items-center justify-between gap-3 text-[11px] ${
                            isOutgoing ? 'text-white/70' : 'text-slate-400'
                          }`}
                        >
                          <span className="font-semibold">{msg.name}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <form
                onSubmit={sendReply}
                className="flex items-center gap-2 border-t border-slate-100 p-3"
              >
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type human reply to customer..."
                  className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                <button type="submit" className="btn-primary shrink-0 !rounded-full !py-2">
                  <Send size={14} />
                  Reply
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
              Select a conversation to view the transcript.
            </div>
          )}
        </div>

        {/* Right: customer panel */}
        <div className="card min-h-0 overflow-y-auto p-5">
          {selectedThread ? (
            <>
              <div className="flex flex-col items-center text-center">
                <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-purple-500 text-lg font-bold text-white">
                  {selectedThread.initials}
                </span>
                <p className="text-sm font-semibold text-slate-900">{selectedThread.customer}</p>
                <p className="text-xs text-slate-500">{selectedThread.email}</p>
                <span className="badge mt-2 gap-1 bg-slate-100 text-slate-600">
                  <MapPin size={11} />
                  {selectedThread.location}
                </span>
              </div>

              <div className="my-5 border-t border-slate-100" />

              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Customer Metrics
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                  <span className="flex items-center gap-2 text-xs text-slate-600">
                    <ShoppingBag size={13} className="text-brand-600" />
                    Total Orders
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {selectedThread.metrics.totalOrders} orders
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                  <span className="flex items-center gap-2 text-xs text-slate-600">
                    <DollarSign size={13} className="text-emerald-600" />
                    Lifetime Value
                  </span>
                  <span className="text-sm font-semibold text-emerald-600">
                    ${selectedThread.metrics.lifetimeValue}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                  <span className="flex items-center gap-2 text-xs text-slate-600">
                    <Star size={13} className="text-amber-500" />
                    CSAT Rating
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                    {selectedThread.metrics.csatRating.toFixed(1)} / 5.0
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
