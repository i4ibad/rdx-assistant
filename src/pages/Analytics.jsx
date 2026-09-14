import React, { useMemo, useState } from 'react'
import { Calendar, DollarSign, MessageSquare, Smile, TrendingUp, Zap } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { analyticsByRange, topInquiryCategories } from '../data/mockData.js'

const rangeOptions = [
  { id: '7d', label: 'Last 7d' },
  { id: '30d', label: 'Last 30d' },
  { id: '90d', label: 'Last 90d' }
]

function StatCard({ icon: Icon, iconColor, label, value, valueColor, trend }) {
  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${iconColor}14` }}
        >
          <Icon size={15} style={{ color: iconColor }} />
        </span>
      </div>
      <p className={`text-2xl font-semibold tracking-tight ${valueColor ?? 'text-slate-900'}`}>
        {value}
      </p>
      <p className="mt-1.5 flex items-center gap-1 text-xs text-emerald-600">
        <TrendingUp size={12} />
        {trend}
      </p>
    </div>
  )
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-popover">
      <p className="mb-1 font-semibold text-slate-700">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: <span className="font-semibold">{entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  )
}

export default function Analytics() {
  const [range, setRange] = useState('7d')
  const data = useMemo(() => analyticsByRange[range], [range])

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="badge border border-brand-200 bg-brand-50 text-brand-700">
              Analytics &amp; Insights
            </span>
            <span className="text-sm text-slate-500">Updated Hourly</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Performance &amp; CSAT Report
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor conversation trends, AI deflection rates, top customer questions, and ROI.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-card">
          <span className="flex h-7 w-7 items-center justify-center text-slate-400">
            <Calendar size={15} />
          </span>
          {rangeOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setRange(opt.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                range === opt.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={MessageSquare}
          iconColor="#6366f1"
          label="Total Inquiries"
          value={data.totalInquiries.toLocaleString()}
          trend={data.totalInquiriesTrend}
        />
        <StatCard
          icon={Zap}
          iconColor="#00b876"
          label="AI Deflection Rate"
          value={`${data.deflectionRate}%`}
          trend={data.deflectionRateTrend}
        />
        <StatCard
          icon={Smile}
          iconColor="#d97706"
          label="Avg CSAT Feedback"
          value={`${data.csat} / 5.0`}
          trend={data.csatTrend}
        />
        <StatCard
          icon={DollarSign}
          iconColor="#00b876"
          label="Est. Support Cost Saved"
          value={`$${data.costSaved.toLocaleString()}`}
          valueColor="text-emerald-600"
          trend={data.costSavedTrend}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Daily Conversation Volume */}
        <div className="card p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-900">Daily Conversation Volume</h2>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-brand-600">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                AI Automated
              </span>
              <span className="flex items-center gap-1.5 text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Human Handoff
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.volume} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="ai"
                  name="AI Automated"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="human"
                  name="Human Handoff"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Customer Inquiry Categories */}
        <div className="card p-5 sm:p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">
            Top Customer Inquiry Categories
          </h2>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topInquiryCategories}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 10, bottom: 0 }}
                barSize={18}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={130}
                  tick={{ fill: '#475569', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" name="Inquiries" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}