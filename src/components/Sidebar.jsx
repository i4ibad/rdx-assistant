import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Bot,
  LayoutGrid,
  Plug,
  BookOpen,
  MessageSquareCode,
  MessagesSquare,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  X,
  LifeBuoy
} from 'lucide-react'
import { navPrimary, navSecondary } from '../data/mockData.js'
import { pageRoutes } from '../routes.js'

const icons = {
  overview: LayoutGrid,
  integrations: Plug,
  knowledge: BookOpen,
  widget: MessageSquareCode,
  conversations: MessagesSquare,
  analytics: BarChart3,
  team: Users,
  settings: Settings,
  billing: CreditCard
}

function NavItem({ item, activePage, onNavigate }) {
  const Icon = icons[item.id] ?? LayoutGrid
  const isActive = activePage === item.id

  return (
    <NavLink
      to={pageRoutes[item.id]}
      end={item.id === 'overview'}
      onClick={onNavigate}
      className={`nav-link w-full ${isActive ? 'nav-link-active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon size={16} strokeWidth={2} className="shrink-0" />
      <span className="flex-1 text-left">{item.label}</span>
      {item.badge ? (
        <span
          className={`badge ${
            isActive ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'
          }`}
        >
          {item.badge}
        </span>
      ) : null}
    </NavLink>
  )
}

export default function Sidebar({ activePage, isOpen, onClose }) {
  const content = (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-2 px-4 py-4">
        <Link to="/" onClick={onClose} className="flex items-center gap-2 rounded-md text-left">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Bot size={18} strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-slate-900">RDX Assistant</span>
            <span className="block text-[11px] text-slate-500">v2.4 &middot; AI Chatbot Platform</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="scrollbar-thin flex-1 space-y-6 overflow-y-auto px-3 py-2">
        <div className="space-y-0.5">
          {navPrimary.map((item) => (
            <NavItem key={item.id} item={item} activePage={activePage} onNavigate={onClose} />
          ))}
        </div>

        <div>
          <p className="px-2.5 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            AI Configuration
          </p>
          <div className="space-y-0.5">
            {navSecondary.map((item) => (
              <NavItem key={item.id} item={item} activePage={activePage} onNavigate={onClose} />
            ))}
          </div>
        </div>
      </nav>

      <div className="m-3 rounded-lg border border-slate-200 bg-slate-50 p-3.5">
        <div className="mb-2 flex items-center gap-1.5 text-slate-700">
          <LifeBuoy size={15} />
          <p className="text-xs font-semibold">Need help integrating?</p>
        </div>
        <p className="mb-3 text-xs leading-relaxed text-slate-500">
          Read the docs or chat live with our support team.
        </p>
        <a
          href="https://docs.rdxassistant.io"
          onClick={(e) => e.preventDefault()}
          className="btn-secondary w-full !py-1.5 text-xs"
        >
          Developer Docs
        </a>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">{content}</div>

      {/* Mobile drawer */}
      {isOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 animate-fade-in"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative z-50 h-full animate-scale-in">{content}</div>
        </div>
      ) : null}
    </>
  )
}
