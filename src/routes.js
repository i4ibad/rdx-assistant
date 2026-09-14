
export const pageRoutes = {
  overview: '/',
  integrations: '/integrations',
  knowledge: '/knowledge-base',
  widget: '/widget',
  conversations: '/conversations',
  analytics: '/analytics',
  team: '/team',
  settings: '/settings',
  billing: '/billing'
}

export const pathToPage = Object.fromEntries(
  Object.entries(pageRoutes).map(([pageId, path]) => [path, pageId])
)
