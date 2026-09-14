import React, { useState } from 'react'
import { Bot, Code, Palette, Plus, Send, Sparkles, Trash2, Zap } from 'lucide-react'

const colorPresets = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6']
const HEX_PATTERN = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/

let replyIdSeq = 1

export default function Widget() {
  const [colorInput, setColorInput] = useState('#6366f1')
  const [botName, setBotName] = useState('RDXBot')
  const [headerTitle, setHeaderTitle] = useState('RDX Assistant')
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hi there! \u{1F44B} How can I help you with your order or product questions today?"
  )
  const [quickPrompts, setQuickPrompts] = useState([
    'Where is my order?',
    'Track my Yodel UK package',
    'What is your return policy?'
  ])
  const [newPrompt, setNewPrompt] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [previewMessages, setPreviewMessages] = useState([])

  const primaryColor = HEX_PATTERN.test(colorInput) ? colorInput : '#6366f1'

  function addPrompt() {
    const trimmed = newPrompt.trim()
    if (!trimmed) return
    setQuickPrompts((prev) => [...prev, trimmed])
    setNewPrompt('')
  }

  function removePrompt(index) {
    setQuickPrompts((prev) => prev.filter((_, i) => i !== index))
  }

  function sendPreviewMessage(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg = { id: replyIdSeq++, role: 'user', text: trimmed }
    const botMsg = {
      id: replyIdSeq++,
      role: 'bot',
      text: "Thanks for reaching out! Let me look into that for you right away."
    }
    setPreviewMessages((prev) => [...prev, userMsg, botMsg])
    setChatInput('')
  }

  function handleChatSubmit(event) {
    event.preventDefault()
    sendPreviewMessage(chatInput)
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="badge border border-brand-200 bg-brand-50 text-brand-700">
              Web Channel
            </span>
            <span className="text-sm text-slate-500">Live Preview &amp; Customizer</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Channels &amp; Chatbot Widget
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Customize your chatbot look and feel, colors, welcome prompts, and copy
            connector-specific embed scripts.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-5">
          <button type="button" className="btn-primary">
            <Palette size={15} />
            Customize Widget
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
          >
            <Code size={15} />
            Install &amp; Embed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: form cards */}
        <div className="space-y-6 lg:col-span-2">
          {/* Branding & Color Theme */}
          <div className="card p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Palette size={16} className="text-brand-600" />
              <h2 className="text-sm font-semibold text-slate-900">
                Branding &amp; Color Theme
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Primary Color
                </label>
                <div className="flex items-center gap-2.5">
                  <label
                    className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-slate-200"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setColorInput(e.target.value)}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      aria-label="Pick primary color"
                    />
                  </label>
                  <input
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    spellCheck={false}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-800 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold text-slate-600">Color Presets</p>
                <div className="flex items-center gap-2.5">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setColorInput(preset)}
                      style={{ backgroundColor: preset }}
                      className={`h-8 w-8 shrink-0 rounded-full transition-transform hover:scale-110 ${
                        primaryColor.toLowerCase() === preset.toLowerCase()
                          ? 'ring-2 ring-slate-900 ring-offset-2 ring-offset-white'
                          : ''
                      }`}
                      aria-label={`Use ${preset} as primary color`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bot Identity & Welcome Copy */}
          <div className="card p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Bot size={16} className="text-brand-600" />
              <h2 className="text-sm font-semibold text-slate-900">
                Bot Identity &amp; Welcome Copy
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Bot Display Name
                </label>
                <input
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Header Title Text
                </label>
                <input
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-brand-600 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Welcome Greeting Message
              </label>
              <textarea
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Suggested Quick Starter Questions */}
          <div className="card p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-brand-600" />
              <h2 className="text-sm font-semibold text-slate-900">
                Suggested Quick Starter Questions
              </h2>
            </div>

            <div className="space-y-2.5">
              {quickPrompts.map((prompt, index) => (
                <div
                  key={`${prompt}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5"
                >
                  <span className="text-sm text-brand-700">{prompt}</span>
                  <button
                    type="button"
                    onClick={() => removePrompt(index)}
                    className="shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                    aria-label={`Remove prompt: ${prompt}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
              <input
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addPrompt()
                  }
                }}
                placeholder="Add a new quick question prompt..."
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <button type="button" onClick={addPrompt} className="btn-primary shrink-0">
                <Plus size={15} />
                Add Prompt
              </button>
            </div>
          </div>
        </div>

        {/* Right column: live widget preview */}
        <div className="lg:col-span-1">
          <div className="card sticky top-6 overflow-hidden !p-0">
            {/* Widget header - uses the live primary color */}
            <div
              className="flex items-center gap-3 px-4 py-4"
              style={{ backgroundColor: primaryColor }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/25">
                <Zap size={18} className="text-amber-300" fill="currentColor" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  {headerTitle || 'RDX Assistant'} <span aria-hidden="true">&#9889;</span>
                </p>
                <p className="truncate text-xs text-white/80">Online &middot; Replies instantly</p>
              </div>
            </div>

            {/* Widget body */}
            <div className="scrollbar-thin flex h-96 flex-col gap-2.5 overflow-y-auto bg-slate-50 px-4 py-4">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-card">
                {welcomeMessage}
              </div>

              {previewMessages.map((msg) =>
                msg.role === 'user' ? (
                  <div
                    key={msg.id}
                    className="max-w-[85%] self-end rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-sm text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {msg.text}
                  </div>
                ) : (
                  <div
                    key={msg.id}
                    className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-card"
                  >
                    {msg.text}
                  </div>
                )
              )}
            </div>

            {/* Quick prompt pills */}
            <div className="flex flex-wrap gap-2 border-t border-slate-100 bg-white px-4 py-3">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={`${prompt}-${index}`}
                  type="button"
                  onClick={() => sendPreviewMessage(prompt)}
                  className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-slate-50"
                  style={{ borderColor: `${primaryColor}66`, color: primaryColor }}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat input */}
            <form
              onSubmit={handleChatSubmit}
              className="flex items-center gap-2 border-t border-slate-100 bg-white px-3 py-3"
            >
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <button
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
                style={{ backgroundColor: primaryColor }}
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>

            <p className="border-t border-slate-100 bg-white py-2.5 text-center text-[11px] text-slate-400">
              Powered by <span className="font-semibold text-slate-600">AetherChat AI</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
