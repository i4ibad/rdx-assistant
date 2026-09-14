import React, { useMemo, useState } from 'react'
import {
  Database,
  FileText,
  Globe,
  HelpCircle,
  Search,
  Sparkles,
  Trash2,
  Upload
} from 'lucide-react'
import {
  knowledgeBaseStats,
  knowledgeSources as initialSources,
  vectorSearchResultsPool
} from '../data/mockData.js'

// Exact icon + accent color per source type, sampled from the live site.
const typeIconMap = {
  Catalog: { Icon: Database, color: '#00b876' },
  Document: { Icon: FileText, color: '#4f46e5' },
  Website: { Icon: Globe, color: '#9333ea' },
  FAQ: { Icon: HelpCircle, color: '#d97706' }
}

const statusStyles = {
  ready: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  processing: 'bg-amber-50 text-amber-600 border-amber-200'
}

const statusLabel = {
  ready: 'Ready',
  processing: 'Processing'
}

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
        checked ? 'bg-brand-600' : 'bg-slate-200'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function SourceRow({ source, onToggle, onDelete }) {
  const { Icon, color } = typeIconMap[source.type] ?? { Icon: FileText, color: '#64748b' }

  return (
    <tr className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <Icon size={16} style={{ color }} className="shrink-0" />
          <span className="text-sm font-medium text-slate-800">{source.name}</span>
        </div>
      </td>
      <td className="px-5 py-3.5">
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          {source.type}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <span className="font-mono text-xs text-brand-600">{source.vectorCount}</span>
      </td>
      <td className="px-5 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
            statusStyles[source.status]
          }`}
        >
          {source.status === 'processing' ? (
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
          ) : null}
          {statusLabel[source.status]}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <ToggleSwitch
          checked={source.enabled}
          onChange={() => onToggle(source.id)}
          label={`Toggle ${source.name}`}
        />
      </td>
      <td className="px-5 py-3.5">
        <span className="text-xs text-slate-400">{source.lastUpdated}</span>
      </td>
      <td className="px-5 py-3.5 text-right">
        <button
          type="button"
          onClick={() => onDelete(source.id)}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
          aria-label={`Delete ${source.name}`}
        >
          <Trash2 size={15} />
        </button>
      </td>
    </tr>
  )
}

export default function KnowledgeBase() {
  const [sources, setSources] = useState(initialSources)
  const [sourceSearch, setSourceSearch] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [searching, setSearching] = useState(false)

  const filteredSources = useMemo(() => {
    if (!sourceSearch.trim()) return sources
    return sources.filter((s) =>
      s.name.toLowerCase().includes(sourceSearch.trim().toLowerCase())
    )
  }, [sources, sourceSearch])

  function toggleSource(id) {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    )
  }

  function deleteSource(id) {
    setSources((prev) => prev.filter((s) => s.id !== id))
  }

  function runSearch(event) {
    event.preventDefault()
    if (!query.trim()) return
    setSearching(true)
    setResults(null)
    setTimeout(() => {
      setResults(vectorSearchResultsPool)
      setSearching(false)
    }, 600)
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="badge border border-brand-200 bg-brand-50 text-brand-700">
              RAG Vector Index
            </span>
            <span className="text-sm text-slate-500">
              {knowledgeBaseStats.totalEmbeddings} Total Embeddings
            </span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Knowledge Base &amp; Context
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Upload PDF documents, connect product catalogs, or crawl your website for RAG
            context retrieval.
          </p>
        </div>

        <div className="flex shrink-0 gap-2.5">
          <button type="button" className="btn-secondary">
            <Globe size={15} />
            Crawl Website URL
          </button>
          <button type="button" className="btn-primary">
            <Upload size={15} />
            Upload Document
          </button>
        </div>
      </div>

      {/* Interactive Vector Search Simulator */}
      <div className="card p-5 sm:p-6">
        <div className="mb-1 flex items-center gap-2">
          <Sparkles size={16} className="text-brand-600" />
          <h2 className="text-sm font-semibold text-slate-900">
            Interactive Vector Search Simulator
          </h2>
        </div>
        <p className="mb-4 text-sm text-slate-500">
          Test how the AI retrieves relevant knowledge chunks for customer questions in
          real-time.
        </p>

        <form onSubmit={runSearch} className="flex flex-col gap-2.5 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a test query (e.g., 'What is the warranty policy for headphones?')"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <button
            type="submit"
            disabled={searching}
            className="btn-primary shrink-0 !rounded-full"
          >
            <Sparkles size={15} className={searching ? 'animate-spin' : ''} />
            {searching ? 'Searching...' : 'Search Vectors'}
          </button>
        </form>

        {results ? (
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Top matching chunks
            </p>
            {results.map((r) => (
              <div key={r.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-brand-600">{r.source}</span>
                  <span className="font-mono text-[11px] text-emerald-600">
                    {Math.round(r.similarity * 100)}% match
                  </span>
                </div>
                <p className="text-sm text-slate-600">{r.chunk}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Knowledge Sources table */}
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">
            Knowledge Sources ({sources.length})
          </h2>
          <div className="relative">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={sourceSearch}
              onChange={(e) => setSourceSearch(e.target.value)}
              placeholder="Search sources..."
              className="w-56 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-5 py-2.5">Source Name</th>
                <th className="px-5 py-2.5">Type</th>
                <th className="px-5 py-2.5">Vector Count</th>
                <th className="px-5 py-2.5">Status</th>
                <th className="px-5 py-2.5">Enabled</th>
                <th className="px-5 py-2.5">Last Updated</th>
                <th className="px-5 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSources.map((source) => (
                <SourceRow
                  key={source.id}
                  source={source}
                  onToggle={toggleSource}
                  onDelete={deleteSource}
                />
              ))}
              {filteredSources.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-slate-400">
                    No knowledge sources match your search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
