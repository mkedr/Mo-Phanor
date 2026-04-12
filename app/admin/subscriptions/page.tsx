'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Mail, Phone, MapPin, Calendar, Tag } from 'lucide-react'

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

export default function SubscriptionsAdminPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  async function fetchSubscriptions() {
    try {
      const response = await fetch('/api/subscriptions')
      if (response.ok) {
        const data = await response.json()
        setSubscriptions(data)
      } else {
        setError('Failed to load subscriptions')
      }
    } catch (e) {
      setError('No subscriptions found yet')
    } finally {
      setLoading(false)
    }
  }

  function exportToCSV() {
    const headers = ['Name', 'Email', 'Phone', 'State', 'Interests', 'Date']
    const rows = subscriptions.map(sub => [
      `${sub.firstName} ${sub.lastName}`,
      sub.email,
      sub.phone || '',
      sub.state || '',
      sub.interests.join('; '),
      new Date(sub.submittedAt).toLocaleDateString()
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/newsletter">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="font-heading text-3xl font-bold text-foreground">
                  Newsletter Subscriptions
                </h1>
                <p className="text-muted-foreground mt-1">
                  {subscriptions.length} subscriber{subscriptions.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {subscriptions.length > 0 && (
              <Button onClick={exportToCSV} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading subscriptions...
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">{error}</p>
              <p className="text-sm text-muted-foreground">
                Subscriptions will appear here once someone signs up.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div 
                  key={sub.id}
                  className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-heading font-bold text-lg text-foreground">
                        {sub.firstName} {sub.lastName}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${sub.email}`} className="hover:text-foreground">
                            {sub.email}
                          </a>
                        </span>
                        {sub.phone && (
                          <span className="flex items-center gap-1.5">
                            <Phone className="h-4 w-4" />
                            <a href={`tel:${sub.phone}`} className="hover:text-foreground">
                              {sub.phone}
                            </a>
                          </span>
                        )}
                        {sub.state && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {sub.state}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    {sub.interests.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        {sub.interests.map((interest) => (
                          <span 
                            key={interest}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
