import React from 'react'
import { PlayCircle, Plug } from 'lucide-react'
import StatCard from '../components/StatCard.jsx'
import SetupChecklist from '../components/SetupChecklist.jsx'
import IntegrationStatusList from '../components/IntegrationStatusList.jsx'
import ConversationsTable from '../components/ConversationsTable.jsx'
import { statCards } from '../data/mockData.js'

export default function Overview({ navigate }) {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex card flex-col justify-between gap-12 sm:flex-row sm:items-center px-3 py-4 sm:px-5 sm:py-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome back, RDX! 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            RDXBot has resolved <span className="font-semibold text-slate-700">2,840 inquiries</span>{' '}
            today with an automated deflection rate of{' '}
            <span className="font-semibold text-slate-700">94.2%</span>.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => navigate('widget')} className="btn-secondary">
            <PlayCircle size={15} />
            Test Live Chatbot
          </button>
          <button
            type="button"
            onClick={() => navigate('integrations')}
            className="btn-primary"
          >
            <Plug size={15} />
            Add Integration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SetupChecklist navigate={navigate} />
        </div>
        <IntegrationStatusList navigate={navigate} />
      </div>

      <ConversationsTable navigate={navigate} />
    </div>
  )
}
