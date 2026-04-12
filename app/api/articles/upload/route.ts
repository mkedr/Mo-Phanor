import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const img = form.get('file') as File
    const artId = form.get('articleId') as string

    if (!img) return NextResponse.json({ error: 'No file' }, { status: 400 })
    if (!artId) return NextResponse.json({ error: 'No article ID' }, { status: 400 })

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowed.includes(img.type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    if (img.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Max 5MB' }, { status: 400 })
    }

    const ext = img.name.split('.').pop() || 'jpg'
    const key = `articles/${artId}/img-${Date.now()}.${ext}`
    
    const result = await put(key, img, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
    })

    return NextResponse.json({ url: result.url })
  } catch (err) {
    console.error('Upload err:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
