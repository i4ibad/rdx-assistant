export const navPrimary = [
  { id: 'overview', label: 'Overview', badge: null },
  { id: 'integrations', label: 'Integrations', badge: 5 },
  { id: 'knowledge', label: 'Knowledge Base', badge: 4 }
]

export const navSecondary = [
  { id: 'widget', label: 'Channels / Widget', badge: null },
  { id: 'conversations', label: 'Conversations', badge: 2 },
  { id: 'analytics', label: 'Analytics', badge: null },
  { id: 'team', label: 'Team', badge: null },
  { id: 'settings', label: 'Settings', badge: null },
  { id: 'billing', label: 'Billing', badge: null }
]

export const pageTitles = {
  overview: 'Overview',
  integrations: 'Integrations',
  knowledge: 'Knowledge Base',
  widget: 'Channels / Widget',
  conversations: 'Conversations',
  analytics: 'Analytics',
  team: 'Team',
  settings: 'Settings',
  billing: 'Billing'
}

export const statCards = [
  {
    id: 'conversations',
    label: 'Conversations Today',
    value: '2,840',
    trend: '+18.4% vs yesterday',
    trendDirection: 'up'
  },
  {
    id: 'resolution',
    label: 'AI Resolution Rate',
    value: '94.2%',
    trend: '+2.1% automated resolution',
    trendDirection: 'up'
  },
  {
    id: 'csat',
    label: 'CSAT Score',
    value: '4.8 / 5.0',
    trend: 'Based on 842 ratings',
    trendDirection: 'neutral'
  },
  {
    id: 'integrations',
    label: 'Active Integrations',
    value: '3 Active',
    trend: 'Shopify, Amazon, Crawler',
    trendDirection: 'neutral'
  },
  {
    id: 'tokens',
    label: 'Token Usage (Month)',
    value: '1.4M / 2M',
    trend: '70% of monthly quota',
    trendDirection: 'warn',
    progress: 70
  }
]

export const setupChecklist = [
  {
    id: 1,
    title: 'Select or Create Tenant Workspace',
    detail: 'Active workspace: RDX Storefront US',
    done: true,
    target: 'settings'
  },
  {
    id: 2,
    title: 'Add Connector (E-commerce / App)',
    detail: 'Connected to Shopify Storefront (1.4k items)',
    done: true,
    target: 'integrations'
  },
  {
    id: 3,
    title: 'Add Knowledge Base (RAG)',
    detail: 'Uploaded Refund Policy & FAQs (18.2k vectors)',
    done: true,
    target: 'knowledge'
  },
  {
    id: 4,
    title: 'Connect AI Model (OpenAI GPT-4o)',
    detail: 'API key active with 0.3 temperature setting',
    done: false,
    target: 'settings'
  },
  {
    id: 5,
    title: 'Customize Chatbot Appearance',
    detail: 'Set Indigo branding, bot avatar & welcome message',
    done: false,
    target: 'widget'
  },
  {
    id: 6,
    title: 'Enable Features & System Prompt',
    detail: 'Order tracking & human handoff enabled',
    done: false,
    target: 'settings'
  },
  {
    id: 7,
    title: 'Get Embed Script & Install',
    detail: 'Copy the one-line script tag to your site body',
    done: false,
    target: 'widget'
  }
]

export const integrationStatus = [
  { id: 1, name: 'Shopify Storefront', syncedAgo: '2 minutes ago', status: 'connected' },
  { id: 2, name: 'Amazon Seller Central', syncedAgo: '15 minutes ago', status: 'connected' },
  { id: 3, name: 'Linnworks Multichannel OMS', syncedAgo: '5 mins ago', status: 'connected' },
  { id: 4, name: 'eDesk E-Commerce Helpdesk', syncedAgo: '10 mins ago', status: 'connected' }
]

export const conversations = [
  {
    id: 1,
    customer: 'Emma Watson',
    email: 'emma.w@gmail.com',
    initials: 'EW',
    message: 'Thank you! Yodel parcel tracking updated.',
    channel: 'shopify',
    sentiment: 'positive',
    status: 'resolved'
  },
  {
    id: 2,
    customer: 'Daniel Cho',
    email: 'daniel.cho@outlook.com',
    initials: 'DC',
    message: 'Can I still swap the size before it ships?',
    channel: 'web',
    sentiment: 'neutral',
    status: 'open'
  },
  {
    id: 3,
    customer: 'Priya Nair',
    email: 'priya.nair@yahoo.com',
    initials: 'PN',
    message: 'Refund is taking longer than the policy said.',
    channel: 'amazon',
    sentiment: 'negative',
    status: 'escalated'
  }
]

export const connectorCategories = [
  'All Connectors',
  'E-Commerce Stores(Shopify/Amazon)',
  'OMS & Inventory(Linnworks)',
  'Logistics & Couriers(CTS/Ship24/Yodel)',
  'Helpdesk & Chat(eDesk/LiveChat/Zendesk)'
]

export const connectors = [
  {
    id: 1,
    name: 'Shopify Storefront',
    description:
      'Sync products, inventory, orders, customer details, and track shipments in real-time.',
    category: 'E-Commerce Stores',
    region: 'global',
    status: 'connected',
    syncedAgo: '2 minutes ago'
  },
  {
    id: 2,
    name: 'Amazon Seller Central',
    description: 'Fetch FBA order updates, tracking IDs, and product catalog listings.',
    category: 'E-Commerce Stores',
    region: 'global',
    status: 'connected',
    syncedAgo: '15 minutes ago'
  },
  {
    id: 3,
    name: 'Linnworks Multichannel OMS',
    description:
      'Centralize inventory management, warehouse order dispatch, stock levels, and postal manifest sync.',
    category: 'OMS & Inventory',
    region: 'global',
    status: 'connected',
    syncedAgo: '5 mins ago'
  },
  {
    id: 4,
    name: 'eDesk E-Commerce Helpdesk',
    description:
      'Unified customer support desk for eBay, Amazon, Shopify, and marketplace ticket resolution.',
    category: 'Helpdesk & Chat',
    region: 'global',
    status: 'connected',
    syncedAgo: '10 mins ago'
  },
  {
    id: 5,
    name: 'LiveChat Customer Engagement',
    description:
      'Real-time agent chat handoff, visitor monitoring, and omnichannel messaging support.',
    category: 'Helpdesk & Chat',
    region: 'global',
    status: 'connected',
    syncedAgo: 'Just now'
  },
  {
    id: 6,
    name: 'CTS Logistics & Transport API',
    description:
      'Custom Transport System API for freight tracking, settlement manifests, and courier dispatch.',
    category: 'Logistics & Couriers',
    region: 'uk',
    status: 'connected',
    syncedAgo: '12 mins ago'
  },
  {
    id: 7,
    name: 'Ship24 Universal Tracking API',
    description:
      'Global multi-carrier tracking engine supporting 1,200+ postal & express couriers worldwide.',
    category: 'Logistics & Couriers',
    region: 'global',
    status: 'connected',
    syncedAgo: 'Just now'
  },
  {
    id: 8,
    name: 'Yodel Delivery UK',
    description:
      'Direct integration for Yodel UK parcel tracking, door-stop delivery updates, and driver ETA.',
    category: 'Logistics & Couriers',
    region: 'uk',
    status: 'connected',
    syncedAgo: '1 hour ago'
  }
]

export const shopifyDataEntities = ['products', 'orders', 'customers', 'returns']

export const commandItems = [
  { id: 'overview', label: 'Go to Overview', group: 'Navigate' },
  { id: 'integrations', label: 'Go to Integrations', group: 'Navigate' },
  { id: 'knowledge', label: 'Go to Knowledge Base', group: 'Navigate' },
  { id: 'widget', label: 'Go to Channels / Widget', group: 'Navigate' },
  { id: 'conversations', label: 'Go to Conversations', group: 'Navigate' },
  { id: 'analytics', label: 'Go to Analytics', group: 'Navigate' },
  { id: 'team', label: 'Go to Team', group: 'Navigate' },
  { id: 'settings', label: 'Go to Settings', group: 'Navigate' },
  { id: 'billing', label: 'Go to Billing', group: 'Navigate' }
]

export const knowledgeBaseStats = {
  totalEmbeddings: '18,670'
}

export const knowledgeSources = [
  {
    id: 1,
    name: 'Shopify Product Catalog (1,420 Items)',
    type: 'Catalog',
    vectorCount: '14,200 vectors',
    status: 'ready',
    enabled: true,
    lastUpdated: '10 mins ago'
  },
  {
    id: 2,
    name: 'Returns & Refund Policy 2026.pdf',
    type: 'Document',
    vectorCount: '850 vectors',
    status: 'ready',
    enabled: true,
    lastUpdated: 'Yesterday'
  },
  {
    id: 3,
    name: 'https://rdxstore.com/help-center/*',
    type: 'Website',
    vectorCount: '3,200 vectors',
    status: 'processing',
    enabled: true,
    lastUpdated: 'Just now'
  },
  {
    id: 4,
    name: 'Shipping & International Delivery FAQs',
    type: 'FAQ',
    vectorCount: '420 vectors',
    status: 'ready',
    enabled: false,
    lastUpdated: '3 days ago'
  }
]

// Static mock results returned by the vector search simulator on the

export const vectorSearchResultsPool = [
  {
    id: 1,
    source: 'Returns & Refund Policy 2026.pdf',
    chunk:
      'Items purchased within the last 30 days are eligible for a full refund provided the original packaging is intact.',
    similarity: 0.94
  },
  {
    id: 2,
    source: 'Shipping & International Delivery FAQs',
    chunk:
      'International orders typically arrive within 7-14 business days depending on customs processing in the destination country.',
    similarity: 0.88
  },
  {
    id: 3,
    source: 'Shopify Product Catalog (1,420 Items)',
    chunk:
      'Headphones ship with a 12-month manufacturer warranty covering defects in materials and workmanship.',
    similarity: 0.81
  }
]

export const conversationThreads = [
  {
    id: 1,
    customer: 'Emma Watson',
    email: 'emma.w@gmail.com',
    initials: 'E',
    channel: 'Shopify',
    status: 'resolved',
    assigned: 'AI Assistant',
    lastMessagePreview: 'Thank you! Yodel parcel tracking updated.',
    lastMessageTime: '10:42 AM',
    location: 'London, UK',
    metrics: { totalOrders: 6, lifetimeValue: 840, csatRating: 5.0 },
    messages: [
      {
        id: 1,
        sender: 'customer',
        name: 'Emma Watson',
        time: '10:38 AM',
        text: 'Can you check my UK Yodel delivery status for order #YD-8812?'
      },
      {
        id: 2,
        sender: 'bot',
        name: 'RDXBot',
        time: '10:38 AM',
        text: 'I am checking with Yodel UK direct courier integration...'
      },
      {
        id: 3,
        sender: 'system',
        text: 'Fetched Yodel UK API (Parcel #YD-8812: Out for delivery by driver Dave)'
      },
      {
        id: 4,
        sender: 'bot',
        name: 'RDXBot',
        time: '10:39 AM',
        text: 'Your Yodel UK parcel #YD-8812 is currently with courier Dave for delivery today between 1:30 PM and 3:30 PM GMT.'
      },
      {
        id: 5,
        sender: 'customer',
        name: 'Emma Watson',
        time: '10:42 AM',
        text: 'Thank you! Yodel parcel tracking updated.'
      }
    ]
  },
  {
    id: 2,
    customer: 'Daniel Cho',
    email: 'daniel.cho@outlook.com',
    initials: 'D',
    channel: 'Web',
    status: 'active_ai',
    assigned: 'AI Assistant',
    lastMessagePreview: 'Good news, your order hasn\u2019t shipped yet.',
    lastMessageTime: '9:16 AM',
    location: 'Toronto, CA',
    metrics: { totalOrders: 2, lifetimeValue: 210, csatRating: 4.5 },
    messages: [
      {
        id: 1,
        sender: 'customer',
        name: 'Daniel Cho',
        time: '9:15 AM',
        text: 'Can I still swap the size before it ships?'
      },
      {
        id: 2,
        sender: 'bot',
        name: 'RDXBot',
        time: '9:16 AM',
        text: 'Let me check the fulfillment status of your order right now...'
      },
      {
        id: 3,
        sender: 'system',
        text: 'Fetched Shopify Order API (Order #SP-4471: Status - Awaiting Fulfillment)'
      },
      {
        id: 4,
        sender: 'bot',
        name: 'RDXBot',
        time: '9:16 AM',
        text: "Good news - your order hasn't shipped yet, so a size swap is possible. Which size would you like instead?"
      }
    ]
  },
  {
    id: 3,
    customer: 'Priya Nair',
    email: 'priya.nair@yahoo.com',
    initials: 'P',
    channel: 'Amazon',
    status: 'handed_over',
    assigned: 'Marcus (Support Lead)',
    lastMessagePreview: "I've flagged this with our finance team directly.",
    lastMessageTime: 'Yesterday',
    location: 'Mumbai, IN',
    metrics: { totalOrders: 9, lifetimeValue: 1290, csatRating: 3.8 },
    messages: [
      {
        id: 1,
        sender: 'customer',
        name: 'Priya Nair',
        time: 'Yesterday',
        text: 'Refund is taking longer than the policy said.'
      },
      {
        id: 2,
        sender: 'bot',
        name: 'RDXBot',
        time: 'Yesterday',
        text: 'I understand the delay is frustrating. Let me pull up your refund status...'
      },
      {
        id: 3,
        sender: 'system',
        text: 'Fetched Amazon Order API (Refund #RF-2291: Status - Pending Bank Review)'
      },
      {
        id: 4,
        sender: 'bot',
        name: 'RDXBot',
        time: 'Yesterday',
        text: "This case needs manual review, so I'm escalating you to a human specialist now."
      },
      {
        id: 5,
        sender: 'human',
        name: 'Marcus (Support Lead)',
        time: 'Yesterday',
        text: "Hi Priya, sorry for the wait - I've flagged this with our finance team directly and will update you within 24 hours."
      }
    ]
  }
]

export const conversationStatusFilters = [
  { id: 'all', label: 'All' },
  { id: 'active_ai', label: 'Active AI' },
  { id: 'handed_over', label: 'Handed Over' },
  { id: 'resolved', label: 'Resolved' }
]

export const analyticsByRange = {
  '7d': {
    totalInquiries: 18390,
    totalInquiriesTrend: '+24% vs last period',
    deflectionRate: 94.2,
    deflectionRateTrend: '+1.8% resolution without humans',
    csat: 4.85,
    csatTrend: '98% positive reviews',
    costSaved: 14250,
    costSavedTrend: 'Saved ~380 agent support hours',
    volume: [
      { day: 'Mon', ai: 2550, human: 120 },
      { day: 'Tue', ai: 2820, human: 90 },
      { day: 'Wed', ai: 3020, human: 110 },
      { day: 'Thu', ai: 2880, human: 95 },
      { day: 'Fri', ai: 3220, human: 140 },
      { day: 'Sat', ai: 1720, human: 60 },
      { day: 'Sun', ai: 1700, human: 55 }
    ]
  },
  '30d': {
    totalInquiries: 76540,
    totalInquiriesTrend: '+18% vs last period',
    deflectionRate: 93.6,
    deflectionRateTrend: '+1.2% resolution without humans',
    csat: 4.79,
    csatTrend: '96% positive reviews',
    costSaved: 58900,
    costSavedTrend: 'Saved ~1,540 agent support hours',
    volume: [
      { day: 'Wk 1', ai: 15400, human: 620 },
      { day: 'Wk 2', ai: 16820, human: 580 },
      { day: 'Wk 3', ai: 17950, human: 710 },
      { day: 'Wk 4', ai: 18100, human: 640 }
    ]
  },
  '90d': {
    totalInquiries: 214300,
    totalInquiriesTrend: '+31% vs last period',
    deflectionRate: 92.8,
    deflectionRateTrend: '+3.1% resolution without humans',
    csat: 4.71,
    csatTrend: '95% positive reviews',
    costSaved: 172400,
    costSavedTrend: 'Saved ~4,520 agent support hours',
    volume: [
      { day: 'Month 1', ai: 61200, human: 2400 },
      { day: 'Month 2', ai: 68700, human: 2100 },
      { day: 'Month 3', ai: 74800, human: 2600 }
    ]
  }
}

export const topInquiryCategories = [
  { name: 'Where is my order?', value: 5200 },
  { name: 'Return / Refund', value: 4300 },
  { name: 'Product Recommendation', value: 3550 },
  { name: 'Shipping Costs', value: 2500 },
  { name: 'Warranty Claim', value: 1550 }
]