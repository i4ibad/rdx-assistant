import React, { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import Overview from './pages/Overview.jsx'
import Integrations from './pages/Integrations.jsx'
import KnowledgeBase from './pages/KnowledgeBase.jsx'
import Widget from './pages/Widget.jsx'
import Conversations from './pages/Conversations.jsx'
import Analytics from './pages/Analytics.jsx'
import Team from './pages/Team.jsx'
import Billing from './pages/Billing.jsx'
import Settings from './pages/Settings.jsx'
import { pageTitles } from './data/mockData.js'
import { pageRoutes, pathToPage } from './routes.js'

export default function AppShell() {
  const location = useLocation()
  const routerNavigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)

  const activePage = pathToPage[location.pathname] ?? 'overview'

  const navigate = useCallback(
    (pageId) => {
      routerNavigate(pageRoutes[pageId] ?? '/')
      setSidebarOpen(false)
      setCommandOpen(false)
    },
    [routerNavigate]
  )

  // Global keyboard shortcut: Cmd+K / Ctrl+K opens the command palette
  useEffect(() => {
    function handleKeyDown(event) {
      const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      if (isCmdK) {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
      if (event.key === 'Escape') {
        setCommandOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <Sidebar
        activePage={activePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={pageTitles[activePage]}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenCommand={() => setCommandOpen(true)}
        />

        <main className="scrollbar-thin flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-6">
            <Routes>
              <Route path="/" element={<Overview navigate={navigate} />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/widget" element={<Widget />} />
              <Route path="/conversations" element={<Conversations />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/team" element={<Team />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/billing" element={<Billing />} />
              {/* Unknown URL: fall back to Overview instead of a blank page */}
              <Route path="*" element={<Overview navigate={navigate} />} />
            </Routes>
          </div>
        </main>
      </div>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} navigate={navigate} />
    </div>
  )
}