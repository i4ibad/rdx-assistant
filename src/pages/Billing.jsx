import React, { useState } from 'react'
import { CheckCircle2, CreditCard, Download, Sparkles, X, Zap } from 'lucide-react'

const currentPlan = {
  name: 'Enterprise AI',
  price: 299,
  renews: 'Sept 1, 2026',
  description: 'Includes unlimited agent seats, priority OpenAI routing, and dedicated support.',
  features: ['Unlimited Teammate Seats', 'Custom RAG Vector Indexes', '99.9% Uptime SLA']
}

const usageMeters = [
  {
    id: 1,
    label: 'Monthly Active Conversations',
    used: '8,420',
    total: '10,000',
    percent: 84,
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 2,
    label: 'AI Token Consumption (GPT-4o)',
    used: '1.4M',
    total: '2.0M tokens',
    percent: 70,
    gradient: 'from-sky-400 to-emerald-400'
  },
  {
    id: 3,
    label: 'Vector Knowledge Storage',
    used: '45 MB',
    total: '100 MB',
    percent: 45,
    gradient: 'from-indigo-500 via-amber-400 to-orange-500'
  }
]

const upgradeTiers = [
  { id: 'enterprise-ai', name: 'Enterprise AI', price: 299, current: true },
  { id: 'enterprise-pro', name: 'Enterprise AI Pro', price: 599, current: false },
  { id: 'enterprise-scale', name: 'Enterprise Scale', price: 1299, current: false }
]

const invoices = [
  { id: 'INV-2026-008', date: 'Aug 1, 2026', amount: '$299.00', status: 'Paid' }
]

export default function Billing() {
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [downloadedId, setDownloadedId] = useState(null)

  function handleDownload(invoiceId) {
    setDownloadedId(invoiceId)
    setTimeout(() => setDownloadedId((current) => (current === invoiceId ? null : current)), 2000)
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="badge border border-brand-200 bg-brand-50 text-brand-700">
              Subscription &amp; Usage
            </span>
            <span className="text-sm text-slate-500">Renews {currentPlan.renews}</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Billing &amp; Token Consumption
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage plan subscriptions, monitor AI token quotas, and download invoices.
          </p>
        </div>

        <button type="button" onClick={() => setUpgradeOpen(true)} className="btn-primary shrink-0">
          <Sparkles size={15} />
          Upgrade Tier
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Current Plan */}
        <div className="card relative overflow-hidden p-5 sm:p-6 lg:col-span-1">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50" />
          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Current Plan
              </p>
              <span className="badge bg-brand-600 text-white">{currentPlan.name}</span>
            </div>

            <p className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-slate-900">${currentPlan.price}</span>
              <span className="text-sm text-slate-500">/ month</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {currentPlan.description}
            </p>

            <ul className="mt-4 space-y-2">
              {currentPlan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Monthly Usage Meters */}
        <div className="card p-5 sm:p-6 lg:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <Zap size={16} className="text-brand-600" />
            <h2 className="text-sm font-semibold text-slate-900">Monthly Usage Meters</h2>
          </div>

          <div className="space-y-5">
            {usageMeters.map((meter) => (
              <div key={meter.id}>
                <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-slate-700">{meter.label}</p>
                  <p className="font-mono text-xs text-brand-600">
                    {meter.used} / {meter.total} ({meter.percent}%)
                  </p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${meter.gradient} transition-all duration-500`}
                    style={{ width: `${meter.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods & Invoice History */}
      <div className="card overflow-hidden">
        <div className="flex items-center gap-2 p-5 sm:p-6">
          <CreditCard size={16} className="text-brand-600" />
          <h2 className="text-sm font-semibold text-slate-900">
            Payment Methods &amp; Invoice History
          </h2>
        </div>

        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-6 py-3">Invoice ID</th>
                <th className="px-6 py-3">Billing Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">PDF Invoice</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-brand-600">{invoice.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{invoice.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">{invoice.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge bg-emerald-50 text-emerald-600">{invoice.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDownload(invoice.id)}
                      className="btn-secondary !py-1.5 !text-xs"
                    >
                      <Download size={13} />
                      {downloadedId === invoice.id ? 'Downloaded' : 'Download'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Tier modal */}
      {upgradeOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/40 animate-fade-in"
            onClick={() => setUpgradeOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg animate-scale-in rounded-2xl border border-slate-200 bg-white p-6 shadow-popover">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Choose a plan</h2>
              <button
                type="button"
                onClick={() => setUpgradeOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {upgradeTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`flex items-center justify-between rounded-xl border p-4 ${
                    tier.current
                      ? 'border-brand-300 bg-brand-50'
                      : 'border-slate-200 hover:border-brand-200'
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{tier.name}</p>
                    <p className="text-xs text-slate-500">${tier.price} / month</p>
                  </div>
                  {tier.current ? (
                    <span className="badge bg-brand-600 text-white">Current Plan</span>
                  ) : (
                    <button type="button" className="btn-secondary !py-1.5 !text-xs">
                      Select
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}