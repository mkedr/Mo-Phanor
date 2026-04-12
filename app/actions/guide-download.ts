'use server'

import { put, list } from '@vercel/blob'

interface GuideDownload {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  state: string
  interests: string[]
  downloadedAt: string
}

async function saveDownloadToBlob(download: GuideDownload) {
  let downloads: GuideDownload[] = []
  
  try {
    const { blobs } = await list({ prefix: 'downloads/' })
    const existingBlob = blobs.find(b => b.pathname === 'downloads/guide-downloads.json')
    
    if (existingBlob) {
      const response = await fetch(existingBlob.url)
      downloads = await response.json()
    }
  } catch (e) {
    // No existing file, start fresh
  }
  
  // Add new download
  downloads.push(download)
  
  // Save updated list
  await put('downloads/guide-downloads.json', JSON.stringify(downloads, null, 2), {
    access: 'public',
    contentType: 'application/json',
    allowOverwrite: true,
  })
  
  return downloads.length
}

export async function submitGuideDownload(formData: FormData) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const state = formData.get('state') as string
  const interests = formData.getAll('interests') as string[]

  // Validate required fields
  if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
    return { success: false, message: 'Please fill in all required fields.' }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  const download: GuideDownload = {
    id: `dl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    phone: phone?.trim() || '',
    state: state?.trim() || '',
    interests,
    downloadedAt: new Date().toISOString(),
  }

  // Format the email content
  const emailBody = `
New Guide Download Request

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
State: ${state || 'Not provided'}
Interests: ${interests.join(', ') || 'None selected'}
Guide: The 7 Cognitive Biases That Cost You Thousands

Downloaded at: ${new Date().toLocaleString()}
  `.trim()

  let emailSent = false
  let savedToStorage = false

  // Try to send email via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Mo Phanor <onboarding@resend.dev>',
          to: 'talktomo@mophanor.com',
          reply_to: email,
          subject: `New Guide Download: ${firstName} ${lastName}`,
          text: emailBody,
        }),
      })

      if (response.ok) {
        emailSent = true
      }
    } catch (error) {
      console.error('Email send error:', error)
    }
  }

  // Save to Blob storage
  try {
    await saveDownloadToBlob(download)
    savedToStorage = true
  } catch (error) {
    console.error('Blob storage error:', error)
  }

  if (emailSent || savedToStorage) {
    return { 
      success: true, 
      message: 'Your guide is ready for download!' 
    }
  }

  return { 
    success: false, 
    message: 'Something went wrong. Please try again.' 
  }
}
