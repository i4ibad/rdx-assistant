import React, { useState } from 'react'
import { Building2, Check, Copy, KeyRound, Plus, ShieldCheck, Trash2 } from 'lucide-react'

const currencies = ['USD ($)', 'GBP (\u00a3)', 'EUR (\u20ac)', 'CAD ($)', 'AUD ($)']
const retentionOptions = [
  '30 Days Retention',
  '90 Days Retention (Recommended)',
  '180 Days Retention',
  '365 Days Retention'
]

let keyIdSeq = 100

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
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function ApiKeyRow({ apiKey, onDelete }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(apiKey.value).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{apiKey.label}</p>
        <p className="truncate font-mono text-xs text-slate-500">{apiKey.value}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
          aria-label={`Copy ${apiKey.label}`}
        >
          {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
        </button>
        <button
          type="button"
          onClick={() => onDelete(apiKey.id)}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
          aria-label={`Delete ${apiKey.label}`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}

export default function Settings() {
  const [orgName, setOrgName] = useState('RDX Global Retail')
  const [currency, setCurrency] = useState('USD ($)')
  const [saved, setSaved] = useState(false)

  const [apiKeys, setApiKeys] = useState([
    { id: 1, label: 'Production Live Key', value: 'ae_live_90812391203' },
    { id: 2, label: 'Development Sandbox', value: 'ae_test_49182390182' }
  ])

  const [piiAnonymization, setPiiAnonymization] = useState(true)
  const [retention, setRetention] = useState('90 Days Retention (Recommended)')

  function handleSave(event) {
    event.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function generateKey() {
    const randomSuffix = Math.floor(10000000000 + Math.random() * 89999999999)
    setApiKeys((prev) => [
      ...prev,
      { id: keyIdSeq++, label: 'New Secret Key', value: `ae_live_${randomSuffix}` }
    ])
  }

  function deleteKey(id) {
    setApiKeys((prev) => prev.filter((k) => k.id !== id))
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <div className="mb-3 flex items-center gap-2.5">
          <span className="badge border border-brand-200 bg-brand-50 text-brand-700">
            Platform Settings
          </span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Organization &amp; Workspace Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Configure organization profile, API keys, security settings, and GDPR data retention.
        </p>
      </div>

      {/* Organization Profile */}
      <div className="card p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <Building2 size={16} className="text-brand-600" />
          <h2 className="text-sm font-semibold text-slate-900">Organization Profile</h2>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Organization Name
              </label>
              <input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Primary Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button type="submit" className="btn-primary">
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Developer API Keys */}
      <div className="card p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <KeyRound size={16} className="text-brand-600" />
            <h2 className="text-sm font-semibold text-slate-900">Developer API Keys</h2>
          </div>
          <button type="button" onClick={generateKey} className="btn-primary !py-1.5 !text-xs">
            <Plus size={13} />
            Generate Secret Key
          </button>
        </div>

        <div className="space-y-2.5">
          {apiKeys.map((key) => (
            <ApiKeyRow key={key.id} apiKey={key} onDelete={deleteKey} />
          ))}
          {apiKeys.length === 0 ? (
            <p className="py-4 text-center text-sm text-slate-400">No API keys yet.</p>
          ) : null}
        </div>
      </div>

      {/* Security & GDPR Data Compliance */}
      <div className="card p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <ShieldCheck size={16} className="text-brand-600" />
          <h2 className="text-sm font-semibold text-slate-900">
            Security &amp; GDPR Data Compliance
          </h2>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5">
          <div>
            <p className="text-sm font-semibold text-slate-800">Customer PII Anonymization</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Mask email addresses and phone numbers in chat logs.
            </p>
          </div>
          <ToggleSwitch
            checked={piiAnonymization}
            onChange={() => setPiiAnonymization((v) => !v)}
            label="Toggle Customer PII Anonymization"
          />
        </div>

        <div className="mt-5">
          <label className="mb-1.5 block text-xs font-semibold text-slate-600">
            Chat History Retention Period
          </label>
          <select
            value={retention}
            onChange={(e) => setRetention(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            {retentionOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}