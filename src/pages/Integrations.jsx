import React, { useMemo, useState } from 'react'
import {
  Check,
  Copy,
  Cpu,
  Headphones,
  MessageSquare,
  Navigation,
  Package,
  RefreshCcw,
  Settings,
  ShoppingBag,
  Truck,
  Unplug,
  X
} from 'lucide-react'
import { connectorCategories, connectors, shopifyDataEntities } from '../data/mockData.js'

const categoryMap = {
  'All Connectors': null,
  'E-Commerce Stores': 'E-Commerce Stores',
  'OMS & Inventory': 'OMS & Inventory',
  'Logistics & Couriers': 'Logistics & Couriers',
  'Helpdesk & Chat': 'Helpdesk & Chat'
}

// Exact icon + accent color per connector, sampled from the live site.
const connectorIconMap = {
  'Shopify Storefront': { Icon: ShoppingBag, color: '#00d492' },
  'Amazon Seller Central': { Icon: Package, color: '#ffb900' },
  'Linnworks Multichannel OMS': { Icon: Cpu, color: '#7c86ff' },
  'eDesk E-Commerce Helpdesk': { Icon: MessageSquare, color: '#c27aff' },
  'LiveChat Customer Engagement': { Icon: Headphones, color: '#00d492' },
  'CTS Logistics & Transport API': { Icon: Truck, color: '#50a2ff' },
  'Ship24 Universal Tracking API': { Icon: Truck, color: '#7c86ff' },
  'Yodel Delivery UK': { Icon: Navigation, color: '#c27aff' }
}

function ConnectorIconBadge({ name }) {
  const { Icon, color } = connectorIconMap[name] ?? { Icon: ShoppingBag, color: '#64748b' }

  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
      style={{ backgroundColor: `${color}14`, borderColor: `${color}33` }}
    >
      <Icon size={22} strokeWidth={2} style={{ color }} />
    </span>
  )
}

function ConnectorCard({ connector, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(connector)}
      className="card group flex flex-col gap-3 p-7 text-left transition-shadow hover:shadow-popover"
    >
      <div className="flex items-start justify-between">
        <ConnectorIconBadge name={connector.name} />
        <span className="badge bg-emerald-50 text-emerald-600 font-bold">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Connected
        </span>
      </div>

      <div>
        <h3 className="text-md font-extrabold text-slate-900">{connector.name}</h3>
        <p className="mt-1 mb-2 text-xs font-semibold leading-relaxed text-slate-500">{connector.description}</p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <span className="text-slate-400">Synced {connector.syncedAgo}</span>
        <span className="flex items-center gap-1 font-medium text-brand-600 group-hover:text-brand-700">
          Configure
          <Settings size={13} />
        </span>
      </div>
    </button>
  )
}

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(value).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <code className="flex-1 truncate text-xs text-slate-600">{value}</code>
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

function ConnectorDetail({ connector, onClose }) {
  const [entities, setEntities] = useState(
    Object.fromEntries(shopifyDataEntities.map((e) => [e, true]))
  )
  const [syncing, setSyncing] = useState(false)
  const [connected, setConnected] = useState(true)

  function toggleEntity(entity) {
    setEntities((prev) => ({ ...prev, [entity]: !prev[entity] }))
  }

  function forceSync() {
    setSyncing(true)
    setTimeout(() => setSyncing(false), 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 animate-fade-in" onClick={onClose} />
      <div className="relative z-10 h-full w-full max-w-md animate-scale-in overflow-y-auto border-l border-slate-200 bg-white shadow-popover">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <ConnectorIconBadge name={connector.name} />
            <div>
              <h2 className="text-sm font-semibold text-slate-900">{connector.name}</h2>
              <span
                className={`badge mt-0.5 ${
                  connected ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100"
            aria-label="Close panel"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 p-5">
          <p className="text-sm leading-relaxed text-slate-600">{connector.description}</p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={forceSync}
              disabled={syncing || !connected}
              className="btn-secondary flex-1"
            >
              <RefreshCcw size={14} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Syncing...' : 'Force Sync Now'}
            </button>
            <button
              type="button"
              onClick={() => setConnected((v) => !v)}
              className="btn-secondary flex-1 !text-rose-600"
            >
              <Unplug size={14} />
              {connected ? 'Disconnect' : 'Reconnect'}
            </button>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Data Entities to Sync
            </p>
            <div className="flex flex-wrap gap-2">
              {shopifyDataEntities.map((entity) => (
                <button
                  key={entity}
                  type="button"
                  onClick={() => toggleEntity(entity)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
                    entities[entity]
                      ? 'border-brand-200 bg-brand-50 text-brand-700'
                      : 'border-slate-200 bg-white text-slate-400'
                  }`}
                >
                  {entity}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Webhook Credentials
              </p>
              <span className="badge bg-emerald-50 text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live Auto-Sync Active
              </span>
            </div>
            <div className="space-y-3">
              <CopyField
                label="Webhook Endpoint URL"
                value={`https://hooks.rdxassistant.io/in/${connector.id}-xj29a`}
              />
              <CopyField label="Webhook Signing Secret" value="whsec_9F3kd82Lp0qT7mZx4vRn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Integrations() {
  const [activeCategory, setActiveCategory] = useState('All Connectors')
  const [activeConnector, setActiveConnector] = useState(null)

  const filtered = useMemo(() => {
    const category = categoryMap[activeCategory]
    if (!category) return connectors
    return connectors.filter((c) => c.category === category)
  }, [activeCategory])

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Integrations &amp; Connected Platforms
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Connect storefronts, OMS (Linnworks), helpdesks (eDesk/LiveChat), and couriers
            (CTS/Ship24/Yodel/DHL).
          </p>
        </div>
        <button type="button" className="btn-primary shrink-0">
          Connect Platform / API
        </button>
      </div>

      <div className="scrollbar-thin flex gap-1.5 overflow-x-auto pb-1">
        {connectorCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === category
                ? 'border-brand-600 bg-brand-600 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((connector) => (
          <ConnectorCard key={connector.id} connector={connector} onOpen={setActiveConnector} />
        ))}
      </div>

      {activeConnector ? (
        <ConnectorDetail connector={activeConnector} onClose={() => setActiveConnector(null)} />
      ) : null}
    </div>
  )
}
