'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { ArrowLeft } from 'lucide-react'

interface Article {
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
}

// Check if content is HTML (from rich text editor) or plain markdown (legacy)
function isHtmlContent(content: string): boolean {
  return content.includes('<p>') || content.includes('<h2>') || content.includes('<h3>') || content.includes('<ul>') || content.includes('<ol>')
}

// Render article content - supports both HTML (new) and markdown (legacy)
function ArticleContent({ content }: { content: string }) {
  if (!content) return null
  
  // If content is HTML, render it directly with proper styling
  if (isHtmlContent(content)) {
    return (
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }
  
  // Legacy markdown parsing for older articles
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentParagraph: string[] = []
  let key = 0
  
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim()
      if (text) {
        elements.push(
          <p key={key++} className="leading-relaxed mb-6">
            {parseInlineFormatting(text)}
          </p>
        )
      }
      currentParagraph = []
    }
  }
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    if (!trimmedLine) {
      flushParagraph()
      continue
    }
    
    if (trimmedLine === '---') {
      flushParagraph()
      elements.push(<hr key={key++} className="my-8 border-border" />)
      continue
    }
    
    if (trimmedLine.startsWith('## ')) {
      flushParagraph()
      elements.push(
        <h2 key={key++} className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">
          {trimmedLine.slice(3)}
        </h2>
      )
      continue
    }
    
    if (trimmedLine.startsWith('### ')) {
      flushParagraph()
      elements.push(
        <h3 key={key++} className="font-heading text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3">
          {trimmedLine.slice(4)}
        </h3>
      )
      continue
    }
    
    currentParagraph.push(trimmedLine)
  }
  
  flushParagraph()
  return <>{elements}</>
}

// Parse inline formatting for legacy markdown content
function parseInlineFormatting(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let key = 0
  
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g
  let match
  
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    
    if (match[1]) {
      parts.push(<strong key={key++} className="font-semibold">{match[1]}</strong>)
    } else if (match[2]) {
      parts.push(<em key={key++} className="italic text-foreground/80">{match[2]}</em>)
    } else if (match[3] && match[4]) {
      parts.push(
        <a 
          key={key++} 
          href={match[4]} 
          className="text-primary hover:underline"
          target={match[4].startsWith('http') ? '_blank' : undefined}
          rel={match[4].startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {match[3]}
        </a>
      )
    }
    
    lastIndex = match.index + match[0].length
  }
  
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  
  return parts.length > 0 ? parts : text
}

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const viewSlug = searchParams.get('view')
  
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  // Scroll to top when page loads or article changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedArticle])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Add cache busting to ensure fresh data
        const res = await fetch(`/api/articles?t=${Date.now()}`, { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        })
        if (res.ok) {
          const data = await res.json()
          const articlesArray = Array.isArray(data) ? data : (data.articles || [])

          setArticles(articlesArray)
          
          // Only auto-select if viewing a specific article from URL parameter
          if (viewSlug) {
            const articleToView = articlesArray.find((a: Article) => a.slug === viewSlug)
            if (articleToView) {
              setSelectedArticle(articleToView)
            }
          }
          // Otherwise show the articles listing (don't auto-select)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [viewSlug])

  // If viewing a specific article
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background">
        <SiteNav />
        
        {/* Article Header - Clean light background */}
        <section className="bg-background pt-24 md:pt-32 pb-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {articles.length > 1 && (
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Articles
                </button>
              )}
              
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                {selectedArticle.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-sm mb-2">
                {selectedArticle.category && (
                  <span className="text-primary font-medium">
                    {selectedArticle.category}
                  </span>
                )}
                {selectedArticle.author && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Written by:</span>
                    <span className="text-primary">{selectedArticle.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span>{new Date(selectedArticle.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
                {selectedArticle.readTime && (
                  <span>{selectedArticle.readTime}</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image - Full width, no overlap */}
        {selectedArticle.image && (
          <div className="container mx-auto px-4 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-foreground article-content-wrapper">
                {selectedArticle.content && selectedArticle.content.length > 0 ? (
                  <ArticleContent content={selectedArticle.content} />
                ) : (
                  <p className="text-muted-foreground italic">This article has no content yet. Check back soon for the full article.</p>
                )}
              </div>

              {/* CTA Section */}
              <section className="bg-muted rounded-xl p-8 mt-12 not-prose">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Ready to Apply These Insights to Your Situation?
                </h3>
                <p className="text-muted-foreground mb-6">
                  If you&apos;ve read this far, you&apos;ve probably already gotten three different answers from three different people — and none of them felt quite right. A 15-minute intro call isn&apos;t a sales pitch. It&apos;s a focused conversation to figure out which decisions actually matter most in your specific situation.
                </p>
                <p className="text-muted-foreground italic mb-6">No jargon. No pressure. Just clarity.</p>
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-white font-semibold">
                  <a href="https://calendly.com/talktomo-mophanor/30min" target="_blank" rel="noopener noreferrer">
                    Book a 15-Minute Intro Call
                  </a>
                </Button>
              </section>
            </div>
          </div>
        </article>

        <SiteFooter />
      </div>
    )
  }

  // Articles listing view
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero Header - Teal background */}
      <section className="bg-primary py-16 md:py-24 pt-28 md:pt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              ARTICLES & RESOURCES
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Decision frameworks to choose confidently, market context without predictions, and mortgage guidance without jargon.
            </p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      )}



      {/* No Articles State */}
      {!loading && articles.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No articles yet. Check back soon!</p>
        </div>
      )}

      {/* Articles Grid - Show ALL articles */}
      {!loading && articles.length > 0 && (
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <p className="text-muted-foreground mb-8">{articles.length} article{articles.length !== 1 ? 's' : ''} available</p>
              
              {/* All Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-card rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow group cursor-pointer text-left"
                  >
                    <div className="relative aspect-[16/9]">
                      {article.image ? (
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-white/60 text-sm">Article</span>
                        </div>
                      )}
                      {article.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-accent text-white text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      {article.category && (
                        <span className="text-accent text-xs font-medium mb-2 block">
                          {article.category}
                        </span>
                      )}
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.subtitle && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {article.subtitle}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        <span className="text-accent font-medium">Read More &rarr;</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  )
}
