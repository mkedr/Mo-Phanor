import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'subscriptions/' })
    const subscriptionsBlob = blobs.find(b => b.pathname === 'subscriptions/newsletter-subscribers.json')
    
    if (!subscriptionsBlob) {
      return NextResponse.json([])
    }

    const response = await fetch(subscriptionsBlob.url)
    const subscriptions = await response.json()
    
    // Sort by most recent first
    subscriptions.sort((a: { submittedAt: string }, b: { submittedAt: string }) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    )

    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('[v0] Error fetching subscriptions:', error)
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 })
  }
}
