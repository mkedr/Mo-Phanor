import { NextResponse } from 'next/server'
import { put, list } from '@vercel/blob'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const STORAGE_KEY = 'data/articles.json'

export interface Article {
  id: string
  title: string
  subtitle: string
  content: string
  image: string
  slug: string
  publishedAt: string
  featured: boolean
  author?: string
  readTime?: string
  category?: string
  updatedAt?: string
}

interface Store {
  articles: Article[]
  lastUpdated?: string
}

const defaults: Store = {
  articles: [{
    id: "four-mortgage-decisions",
    title: "The 4 Mortgage Decisions That Actually Matter",
    subtitle: "Stop obsessing over the rate. Here's what actually shapes your financial outcome.",
    content: `The mortgage industry wants you focused on the rate...`,
    image: "",
    slug: "four-mortgage-decisions",
    publishedAt: "2026-03-05",
    featured: true,
    author: "Mo Phanor",
    readTime: "8 min read",
    category: "Mortgage Strategy"
  }],
  lastUpdated: new Date().toISOString()
}

async function load(): Promise<Store> {
  try {
    const { blobs } = await list({ prefix: 'data/' })
    const blob = blobs.find(b => b.pathname === STORAGE_KEY) || 
      blobs.filter(b => b.pathname.startsWith('data/articles'))
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())[0]
    
    if (blob) {
      const res = await fetch(`${blob.url}?_=${Date.now()}`, { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        return {
          ...data,
          articles: (data.articles || []).map((a: Article) => ({
            ...a,
            content: a.content || '',
            author: a.author || 'Mo Phanor',
            readTime: a.readTime || '5 min read',
            category: a.category || 'Mortgage Strategy'
          }))
        }
      }
    }
    return defaults
  } catch {
    return defaults
  }
}

async function save(store: Store): Promise<void> {
  store.lastUpdated = new Date().toISOString()
  
  // IMPORTANT: allowOverwrite must be true for blob updates
  await put(STORAGE_KEY, JSON.stringify(store, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,  // Required for updates
  })
}

export async function GET() {
  const store = await load()
  return NextResponse.json(store.articles, {
    headers: { 'Cache-Control': 'no-store' }
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.title) return NextResponse.json({ error: 'Title required' }, { status: 400 })

    const store = await load()
    const baseSlug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    let slug = baseSlug
    let n = 1
    while (store.articles.some(a => a.slug === slug)) slug = `${baseSlug}-${n++}`

    const article: Article = {
      id: slug,
      title: body.title,
      subtitle: body.subtitle || '',
      content: body.content || '',
      image: body.image || '',
      slug,
      publishedAt: new Date().toISOString().split('T')[0],
      featured: body.featured || false,
      author: body.author || 'Mo Phanor',
      readTime: body.readTime || '5 min read',
      category: body.category || 'Mortgage Strategy',
      updatedAt: new Date().toISOString()
    }

    store.articles.unshift(article)
    await save(store)
    return NextResponse.json({ success: true, article })
  } catch (e) {
    console.error('POST:', e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updates } = await req.json()
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    const store = await load()
    const i = store.articles.findIndex(a => a.id === id)
    if (i === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    store.articles[i] = { ...store.articles[i], ...updates, updatedAt: new Date().toISOString() }
    await save(store)
    return NextResponse.json({ success: true, article: store.articles[i] })
  } catch (e) {
    console.error('PUT:', e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    const store = await load()
    const i = store.articles.findIndex(a => a.id === id)
    if (i === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    store.articles.splice(i, 1)
    await save(store)
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('DELETE:', e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PATCH() {
  try {
    await save(defaults)
    return NextResponse.json({ success: true, articles: defaults.articles })
  } catch (e) {
    console.error('PATCH:', e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
