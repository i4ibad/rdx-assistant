import React, { useState } from 'react'
import { ChevronDown, Trash2, UserPlus, X } from 'lucide-react'

const roles = ['Owner', 'Admin', 'Agent', 'Viewer']

let memberIdSeq = 100

const initialMembers = [
  {
    id: 1,
    name: 'RDX',
    email: 'rdx@aetherchat.io',
    role: 'Owner',
    status: 'active',
    lastActive: 'Now'
  }
]

function StatusBadge({ status }) {
  if (status === 'invited') {
    return <span className="badge bg-amber-50 text-amber-600">Invited</span>
  }
  return <span className="badge bg-emerald-50 text-emerald-600">Active</span>
}

export default function Team() {
  const [members, setMembers] = useState(initialMembers)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteName, setInviteName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Agent')

  function updateRole(id, role) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)))
  }

  function removeMember(id) {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  function sendInvite(event) {
    event.preventDefault()
    const name = inviteName.trim()
    const email = inviteEmail.trim()
    if (!name || !email) return

    setMembers((prev) => [
      ...prev,
      {
        id: memberIdSeq++,
        name,
        email,
        role: inviteRole,
        status: 'invited',
        lastActive: '\u2014'
      }
    ])
    setInviteName('')
    setInviteEmail('')
    setInviteRole('Agent')
    setInviteOpen(false)
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="badge border border-brand-200 bg-brand-50 text-brand-700">
              Access Control
            </span>
            <span className="text-sm text-slate-500">{members.length} Seats Assigned</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Team Members &amp; Roles
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage user access permissions, invite agents, and assign roles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setInviteOpen((v) => !v)}
          className="btn-primary shrink-0"
        >
          <UserPlus size={15} />
          Invite Team Member
        </button>
      </div>

      {/* Invite form */}
      {inviteOpen ? (
        <div className="card p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Invite a new team member</h2>
            <button
              type="button"
              onClick={() => setInviteOpen(false)}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100"
              aria-label="Close invite form"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={sendInvite} className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_140px_auto]">
            <input
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="Full name"
              required
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              required
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {roles
                .filter((r) => r !== 'Owner')
                .map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
            </select>
            <button type="submit" className="btn-primary">
              Send Invite
            </button>
          </form>
        </div>
      ) : null}

      {/* Members table */}
      <div className="card overflow-hidden">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-6 py-3">Member Name</th>
                <th className="px-6 py-3">Email Address</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last Active</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-purple-500 text-sm font-bold text-white">
                        {member.name.charAt(0)}
                      </span>
                      <span className="text-sm font-semibold text-slate-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-slate-500">{member.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative inline-block">
                      <select
                        value={member.role}
                        onChange={(e) => updateRole(member.id, e.target.value)}
                        disabled={member.role === 'Owner'}
                        className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-3 pr-8 text-sm font-medium text-slate-700 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {roles.map((r) => (
                          <option key={r} value={r} disabled={r === 'Owner' && member.role !== 'Owner'}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={member.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-400">{member.lastActive}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {member.role !== 'Owner' ? (
                      <button
                        type="button"
                        onClick={() => removeMember(member.id)}
                        className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                        aria-label={`Remove ${member.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}