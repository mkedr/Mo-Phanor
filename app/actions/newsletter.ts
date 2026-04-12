'use server'

import { put, list } from '@vercel/blob'

interface Subscription {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  state: string
  interests: string[]
  submittedAt: string
}

async function saveSubscriptionToBlob(subscription: Subscription) {
  // Fetch existing subscriptions
  let subscriptions: Subscription[] = []
  
  try {
    const { blobs } = await list({ prefix: 'subscriptions/' })
    const existingBlob = blobs.find(b => b.pathname === 'subscriptions/newsletter-subscribers.json')
    
    if (existingBlob) {
      const response = await fetch(existingBlob.url)
      subscriptions = await response.json()
    }
  } catch {
    // No existing file, start fresh
  }
  
  // Add new subscription
  subscriptions.push(subscription)
  
  // Save updated list
  await put('subscriptions/newsletter-subscribers.json', JSON.stringify(subscriptions, null, 2), {
    access: 'public',
    contentType: 'application/json',
    allowOverwrite: true,
  })
  
  return subscriptions.length
}

export async function submitNewsletter(formData: FormData) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const state = formData.get('state') as string
  const interests = formData.getAll('interests') as string[]

  // Validate required fields
  if (!firstName || !lastName || !email) {
    return { success: false, message: 'Please fill in all required fields.' }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  const subscription: Subscription = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    firstName,
    lastName,
    email,
    phone: phone || '',
    state: state || '',
    interests,
    submittedAt: new Date().toISOString(),
  }

  // Format the email content
  const emailBody = `
New Newsletter Subscription

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
State: ${state || 'Not provided'}
Interests: ${interests.join(', ') || 'None selected'}

Submitted at: ${new Date().toLocaleString()}
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
          from: 'Mo Phanor <onboarding@resend.dev>', // Use Resend's default domain until custom domain is verified
          to: 'talktomo@mophanor.com',
          reply_to: email,
          subject: `New Newsletter Subscription: ${firstName} ${lastName}`,
          text: emailBody,
        }),
      })

      if (response.ok) {
        emailSent = true
      }
    } catch {
      // Email send failed, will fall back to storage
    }
  }

  // Always save to Blob storage as backup/primary data store
  try {
    await saveSubscriptionToBlob(subscription)
    savedToStorage = true
  } catch {
    // Storage failed
  }

  // Return success if either method worked
  if (emailSent || savedToStorage) {
    return { 
      success: true, 
      message: 'Thank you for signing up! You\'ll receive our updates soon.' 
    }
  }

  return { 
    success: false, 
    message: 'Something went wrong. Please try again or contact us directly.' 
  }
}
