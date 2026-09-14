import React from 'react'
import { Store, PackageSearch, Boxes, Headset, Activity } from 'lucide-react'
import { integrationStatus } from '../data/mockData.js'

const iconFor = {
  'Shopify Storefront': Store,
  'Amazon Seller Central': PackageSearch,
  'Linnworks Multichannel OMS': Boxes,
  'eDesk E-Commerce Helpdesk': Headset
}

export default function IntegrationStatusList({ navigate }) {
  return (
    <div className="card p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Integration Status</h2>
        <button
          type="button"
          onClick={() => navigate('integrations')}
          className="text-xs font-medium text-brand-600 hover:text-brand-700"
        >
          View All
        </button>
      </div>

      <ul className="space-y-3">
        {integrationStatus.map((item) => {
          const Icon = iconFor[item.name] ?? Store
          return (
            <li key={item.id} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Icon size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{item.name}</p>
                <p className="text-xs text-slate-500">{item.syncedAgo}</p>
              </div>
              <span className="badge bg-emerald-50 text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Connected
              </span>
            </li>
          )
        })}
      </ul>

      <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-2 text-xs text-emerald-700">
        <Activity size={13} />
        Webhook Server: Healthy
      </div>
    </div>
  )
}
