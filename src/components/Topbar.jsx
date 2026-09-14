import React, { useState } from 'react'
import { Menu, Search, Bell, ChevronDown, Check } from 'lucide-react'

const workspaces = ['RDX Storefront US', 'RDX Storefront UK', 'RDX Storefront EU']

export default function Topbar({ title, onOpenSidebar, onOpenCommand }) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0])
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifCount, setNotifCount] = useState(2)

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>

      <div className="hidden items-center gap-1.5 text-sm text-slate-500 lg:flex">
        <span className="text-slate-400">Overview</span>
        {title !== 'Overview' ? (
          <>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-700">{title}</span>
          </>
        ) : null}
      </div>

      <span className="text-sm font-semibold text-slate-900 lg:hidden">{title}</span>

      <div className="ml-auto flex items-center gap-2">
        <button
        type="button"
        onClick={onOpenCommand}
        className="ml-2 flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400 transition-colors hover:border-slate-300 hover:bg-white sm:max-w-xs"
      >
        <Search size={15} />
        <span className="hidden truncate sm:inline">Search or jump to...</span>
        <kbd className="ml-auto hidden shrink-0 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-400 sm:inline">
          &#8984;K
        </kbd>
      </button>
        {/* Workspace switcher */}
        <div className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => setWorkspaceOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm hover:bg-slate-50"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-brand-600 text-[10px] font-bold text-white">
              R
            </span>
            <span className="max-w-[140px] truncate font-medium text-slate-700">
              {activeWorkspace}
            </span>
            <span className="badge bg-slate-100 text-slate-500">Enterprise</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {workspaceOpen ? (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setWorkspaceOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-56 animate-scale-in rounded-lg border border-slate-200 bg-white p-1 shadow-popover">
                {workspaces.map((ws) => (
                  <button
                    key={ws}
                    type="button"
                    onClick={() => {
                      setActiveWorkspace(ws)
                      setWorkspaceOpen(false)
                    }}
                    className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                  >
                    {ws}
                    {ws === activeWorkspace ? (
                      <Check size={14} className="text-brand-600" />
                    ) : null}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((v) => !v)
              setNotifCount(0)
            }}
            className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={17} />
            {notifCount > 0 ? (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-semibold text-white">
                {notifCount}
              </span>
            ) : null}
          </button>

          {notifOpen ? (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-72 animate-scale-in rounded-lg border border-slate-200 bg-white p-3 shadow-popover">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Notifications
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-700">
                    <span className="font-medium">Webhook</span> reconnected on Shopify Storefront.
                  </p>
                  <p className="text-slate-700">
                    <span className="font-medium">Priya Nair</span>&apos;s conversation was escalated.
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white"
          aria-label="Account menu"
        >
          SL
        </button>
      </div>
    </header>
  )
}
