import React, { useMemo, useRef, useState } from 'react'
import {
  Check,
  Database,
  FileText,
  FileUp,
  Globe,
  HelpCircle,
  Loader2,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X
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
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? 'bg-brand-600' : 'bg-slate-200'
        }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'
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
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[source.status]
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

function CrawlWebsiteModal({ open, onClose, onCrawlComplete }) {
  const [url, setUrl] = useState('')
  const [crawlDepth, setCrawlDepth] = useState('all')
  const [crawling, setCrawling] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    let trimmed = url.trim()
    if (!trimmed) {
      setError('Please enter a valid website URL')
      return
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      trimmed = `https://${trimmed}`
    }
    setError('')
    setCrawling(true)

    const randomVectors = Math.floor(Math.random() * 800) + 1200
    setTimeout(() => {
      onCrawlComplete(
        {
          id: Date.now(),
          name: crawlDepth === 'all' ? `${trimmed}/*` : trimmed,
          type: 'Website',
          vectorCount: `${randomVectors.toLocaleString()} vectors`,
          status: 'processing',
          enabled: true,
          lastUpdated: 'Just now'
        },
        randomVectors
      )
      setCrawling(false)
      setUrl('')
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 animate-fade-in"
        onClick={() => !crawling && onClose()}
      />
      <div className="relative z-10 w-full max-w-lg animate-scale-in overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-popover">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-200 bg-purple-50 text-purple-600">
              <Globe size={20} />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Crawl Website URL</h2>
            </div>
          </div>
          <button
            type="button"
            disabled={crawling}
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              Website URL / Domain
            </label>
            <div className="relative">
              <Globe
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  if (error) setError('')
                }}
                disabled={crawling}
                placeholder="https://docs.yourstore.com"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Our crawler will extract all publicly accessible subpages and FAQs automatically.
          </p>
          <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-3">
            <button
              type="button"
              disabled={crawling}
              onClick={onClose}
              className="btn-secondary !py-2 !text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={crawling || !url.trim()}
              className="btn-primary !py-2 !text-xs"
            >
              {crawling ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Crawling...
                </>
              ) : (
                <>
                  <Globe size={14} />
                  Start Crawling
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function UploadDocumentModal({ open, onClose, onUploadComplete }) {
  const [file, setFile] = useState(null)
  const [docName, setDocName] = useState('')
  const [docType, setDocType] = useState('Document')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  if (!open) return null

  function handleFileChange(e) {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      setError('')
      if (!docName) {
        setDocName(selected.name)
      }
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) {
      setFile(dropped)
      setError('')
      if (!docName) {
        setDocName(dropped.name)
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!file && !docName.trim()) {
      setError('Please select a file or provide a document name')
      return
    }

    setUploading(true)
    setProgress(20)

    setTimeout(() => setProgress(60), 400)
    setTimeout(() => setProgress(90), 800)
    setTimeout(() => {
      setProgress(100)
      const randomVectors = Math.floor(Math.random() * 900) + 650
      onUploadComplete(
        {
          id: Date.now(),
          name: docName.trim() || file?.name || 'Knowledge_Doc.pdf',
          type: docType,
          vectorCount: `${randomVectors.toLocaleString()} vectors`,
          status: 'processing',
          enabled: true,
          lastUpdated: 'Just now'
        },
        randomVectors
      )
      setUploading(false)
      setFile(null)
      setDocName('')
      setProgress(0)
      onClose()
    }, 1300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 animate-fade-in"
        onClick={() => !uploading && onClose()}
      />
      <div className="relative z-10 w-full max-w-lg animate-scale-in overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-popover">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600">
              <Upload size={20} />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Upload Knowledge Document</h2>
              <p className="text-xs text-slate-500">
                Upload PDFs, DOCX, or text files to index into vector search
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={uploading}
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.csv"
            className="hidden"
          />

          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center transition-all hover:border-brand-400 hover:bg-brand-50/20"
            >
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <FileUp size={22} />
              </div>
              <p className="text-xs font-semibold text-slate-800">
                Click to browse or drag and drop document
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                PDF, DOCX, TXT, or CSV (up to 25MB)
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50/40 p-3.5">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <FileText size={18} />
                </div>
                <div className="min-w-0 text-left">
                  <p className="truncate text-xs font-semibold text-slate-800">{file.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {(file.size / 1024).toFixed(1)} KB • Ready for indexing
                  </p>
                </div>
              </div>
              {!uploading && (
                <button
                  type="button"
                  onClick={() => {
                    setFile(null)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  className="rounded-md p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-600"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          )}
          {uploading ? (
            <div className="space-y-2 rounded-xl border border-brand-100 bg-brand-50/60 p-3.5">
              <div className="flex items-center justify-between text-xs font-semibold text-brand-700">
                <span className="flex items-center gap-1.5">
                  <Loader2 size={13} className="animate-spin text-brand-600" />
                  {progress < 40
                    ? 'Uploading & extracting text...'
                    : progress < 80
                      ? 'Chunking into 512-token segments...'
                      : 'Generating OpenAI vector embeddings...'}
                </span>
                <span className="font-mono">{progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-200/60">
                <div
                  className="h-full bg-brand-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-3">
            <button
              type="button"
              disabled={uploading}
              onClick={onClose}
              className="btn-secondary !py-2 !text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || (!file && !docName.trim())}
              className="btn-primary !py-2 !text-xs"
            >
              {uploading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Indexing...
                </>
              ) : (
                <>
                  <Upload size={14} />
                  Upload &amp; Index
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function KnowledgeBase() {
  const [sources, setSources] = useState(initialSources)
  const [sourceSearch, setSourceSearch] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [searching, setSearching] = useState(false)

  const [crawlModalOpen, setCrawlModalOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [totalEmbeddings, setTotalEmbeddings] = useState(
    parseInt(knowledgeBaseStats.totalEmbeddings.replace(/,/g, ''), 10) || 18670
  )
  const [notification, setNotification] = useState('')

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

  function handleCrawlComplete(newSource, vectorCountNum) {
    setSources((prev) => [newSource, ...prev])
    setTotalEmbeddings((prev) => prev + vectorCountNum)
    setNotification(`Website source "${newSource.name}" queued and crawling started.`)
    setTimeout(() => {
      setSources((prev) =>
        prev.map((s) => (s.id === newSource.id ? { ...s, status: 'ready' } : s))
      )
    }, 3500)
    setTimeout(() => setNotification(''), 5000)
  }

  function handleUploadComplete(newSource, vectorCountNum) {
    setSources((prev) => [newSource, ...prev])
    setTotalEmbeddings((prev) => prev + vectorCountNum)
    setNotification(`Document "${newSource.name}" uploaded and indexed successfully.`)
    setTimeout(() => {
      setSources((prev) =>
        prev.map((s) => (s.id === newSource.id ? { ...s, status: 'ready' } : s))
      )
    }, 3500)
    setTimeout(() => setNotification(''), 5000)
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
              {totalEmbeddings.toLocaleString()} Total Embeddings
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
          <button
            type="button"
            onClick={() => setCrawlModalOpen(true)}
            className="btn-secondary"
          >
            <Globe size={15} />
            Crawl Website URL
          </button>
          <button
            type="button"
            onClick={() => setUploadModalOpen(true)}
            className="btn-primary"
          >
            <Upload size={15} />
            Upload Document
          </button>
        </div>
      </div>

      {notification ? (
        <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-800 animate-fade-in">
          <div className="flex items-center gap-2">
            <Check size={14} className="shrink-0 text-emerald-600" />
            <span className="font-medium">{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification('')}
            className="rounded-md p-1 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-800"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}

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
      
      <CrawlWebsiteModal
        open={crawlModalOpen}
        onClose={() => setCrawlModalOpen(false)}
        onCrawlComplete={handleCrawlComplete}
      />
      <UploadDocumentModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  )
}
