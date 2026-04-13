'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Upload, Plus, Trash2, Eye, Image as ImageIcon, X, Check, AlertCircle, Lock, Copy, Edit3, Save, ChevronDown, ChevronUp, RefreshCw, FileText, Sparkles } from 'lucide-react'
import { RichTextEditor } from '@/components/rich-text-editor'

interface Article {
  id: string
  slug: string
  title: string
  subtitle: string
  content: string
  featured: boolean
  image: string
  publishedAt: string
  author?: string
  readTime?: string
  category?: string
  updatedAt?: string
}

// Article content template for consistent formatting (HTML for rich text editor)
const ARTICLE_TEMPLATE = `<p>Write your introduction paragraph here. This should hook the reader and explain what they'll learn.</p>

<h2>First Main Section</h2>
<p>Your first main point goes here. Use clear, conversational language.</p>
<p><strong>Key takeaway:</strong> Highlight important points like this.</p>

<h2>Second Main Section</h2>
<p>Continue building your argument or explaining your topic.</p>

<h3>Subsection (if needed)</h3>
<p>Break down complex topics into smaller sections.</p>

<h2>Third Main Section</h2>
<p>Keep sections focused on one main idea each.</p>
<p><strong>The Real Question to Ask:</strong> End sections with actionable questions when relevant.</p>

<h2>Conclusion</h2>
<p>Wrap up with a summary and call to action.</p>

<p><strong>Sources:</strong> List any sources at the end.</p>`

export default function AdminArticlesPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // New article form state
  const [showNewForm, setShowNewForm] = useState(false)
  const [newArticle, setNewArticle] = useState({
    title: '',
    subtitle: '',
    content: '',
    featured: false,
    author: 'Mo Phanor',
    readTime: '5 min read',
    category: 'Mortgage Strategy'
  })
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  
  // Edit article state
  const [editingArticle, setEditingArticle] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Article | null>(null)
  const [saving, setSaving] = useState(false)
  
  // Expanded article content view
  const [expandedContent, setExpandedContent] = useState<string | null>(null)
  
  // Template preview
  const [showTemplatePreview, setShowTemplatePreview] = useState(false)
  
  const newImageInputRef = useRef<HTMLInputElement>(null)
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  // Check if already authenticated on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setAuthLoading(false)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles()
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoggingIn(true)
    setAuthError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (res.ok) {
        sessionStorage.setItem('admin_authenticated', 'true')
        setIsAuthenticated(true)
      } else {
        setAuthError('Invalid password')
      }
    } catch {
      setAuthError('Authentication failed')
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
    setPassword('')
  }

  const fetchArticles = async () => {
    setLoading(true)
    try {
      // Add cache busting
      const res = await fetch(`/api/articles?t=${Date.now()}`, { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      if (res.ok) {
        const data = await res.json()
        const articlesArray = Array.isArray(data) ? data : data.articles || []
        setArticles(articlesArray)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      showMessage('error', 'Failed to load articles')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleImageUpload = async (articleId: string, file: File) => {
    setUploading(articleId)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('articleId', articleId)

      const uploadRes = await fetch('/api/articles/upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const { url } = await uploadRes.json()
      
      // Update article with new image URL
      const updateRes = await fetch('/api/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: articleId, image: url }),
      })

      if (!updateRes.ok) {
        const errorData = await updateRes.json()
        throw new Error(errorData.error || 'Failed to update article')
      }
      
      // Refresh articles
      await fetchArticles()
      showMessage('success', 'Image uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      showMessage('error', error instanceof Error ? error.message : 'Failed to upload image. Please try again.')
    } finally {
      setUploading(null)
    }
  }

  const handleNewImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setNewImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newArticle.title.trim()) {
      showMessage('error', 'Please enter a title')
      return
    }
    
    setCreating(true)
    
    try {
      // Generate slug from title
      const slug = newArticle.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      // Create the article
      const createRes = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newArticle.title,
          subtitle: newArticle.subtitle,
          content: newArticle.content,
          featured: newArticle.featured,
          author: newArticle.author,
          readTime: newArticle.readTime,
          category: newArticle.category,
          slug
        })
      })
      
      if (!createRes.ok) {
        const error = await createRes.json()
        throw new Error(error.error || 'Failed to create article')
      }
      
      const { article } = await createRes.json()
      
      // Upload image if provided
      if (newImageFile) {
        const formData = new FormData()
        formData.append('file', newImageFile)
        formData.append('articleId', article.id)
        
        const uploadRes = await fetch('/api/articles/upload', {
          method: 'POST',
          body: formData
        })
        
        if (uploadRes.ok) {
          const { url } = await uploadRes.json()
          // Update article with image
          await fetch('/api/articles', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: article.id, image: url })
          })
        }
      }
      
      // Small delay to ensure blob storage has propagated
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Refresh and reset
      await fetchArticles()
      setNewArticle({ 
        title: '', 
        subtitle: '', 
        content: '', 
        featured: false,
        author: 'Mo Phanor',
        readTime: '5 min read',
        category: 'Mortgage Strategy'
      })
      setNewImageFile(null)
      setNewImagePreview(null)
      setShowNewForm(false)
      showMessage('success', 'Article created successfully!')
    } catch (error) {
      console.error('Error creating article:', error)
      showMessage('error', error instanceof Error ? error.message : 'Failed to create article')
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article? This cannot be undone.')) {
      return
    }
    
    setDeleting(articleId)
    
    try {
      const res = await fetch('/api/articles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: articleId })
      })
      
      if (!res.ok) {
        throw new Error('Failed to delete article')
      }
      
      await fetchArticles()
      showMessage('success', 'Article deleted successfully!')
    } catch (error) {
      console.error('Error deleting article:', error)
      showMessage('error', 'Failed to delete article. Please try again.')
    } finally {
      setDeleting(null)
    }
  }

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article.id)
    setEditForm({ ...article })
  }

  const handleSaveEdit = async () => {
    if (!editForm) return
    
    setSaving(true)
    
    try {
      const res = await fetch('/api/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editForm.id,
          title: editForm.title,
          subtitle: editForm.subtitle,
          content: editForm.content,
          featured: editForm.featured,
          author: editForm.author,
          readTime: editForm.readTime,
          category: editForm.category
        })
      })
      
      if (!res.ok) {
        throw new Error('Failed to update article')
      }
      
      await fetchArticles()
      setEditingArticle(null)
      setEditForm(null)
      showMessage('success', 'Article updated successfully!')
    } catch (error) {
      console.error('Error updating article:', error)
      showMessage('error', 'Failed to update article. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingArticle(null)
    setEditForm(null)
  }

  const clearNewImage = () => {
    setNewImageFile(null)
    setNewImagePreview(null)
    if (newImageInputRef.current) {
      newImageInputRef.current.value = ''
    }
  }

  const handleUseAsTemplate = (article: Article) => {
    setNewArticle({
      title: `${article.title} (Copy)`,
      subtitle: article.subtitle,
      content: article.content || '',
      featured: false,
      author: article.author || 'Mo Phanor',
      readTime: article.readTime || '5 min read',
      category: article.category || 'Mortgage Strategy'
    })
    setShowNewForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    showMessage('success', 'Article copied as template. Edit and save as new.')
  }

  const handleUseBlankTemplate = () => {
    setNewArticle({
      title: '',
      subtitle: '',
      content: ARTICLE_TEMPLATE,
      featured: false,
      author: 'Mo Phanor',
      readTime: '5 min read',
      category: 'Mortgage Strategy'
    })
    setShowNewForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleResetToTemplate = async () => {
    if (!confirm('This will reset all articles to the default template article. All existing articles will be deleted. Are you sure?')) {
      return
    }
    
    try {
      const res = await fetch('/api/articles', { method: 'PATCH' })
      if (res.ok) {
        await fetchArticles()
        showMessage('success', 'Articles reset to default template successfully!')
      } else {
        throw new Error('Failed to reset')
      }
    } catch (error) {
      console.error('Error resetting articles:', error)
      showMessage('error', 'Failed to reset articles. Please try again.')
    }
  }

  // Calculate word count and estimated read time
  const calculateReadTime = (content: string): string => {
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / 200) // Average reading speed
    return `${minutes} min read`
  }

  const handleContentChange = (content: string) => {
    const readTime = calculateReadTime(content)
    setNewArticle(prev => ({ ...prev, content, readTime }))
  }

  const handleEditContentChange = (content: string) => {
    if (editForm) {
      const readTime = calculateReadTime(content)
      setEditForm(prev => prev ? { ...prev, content, readTime } : null)
    }
  }

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A9D8F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#2A9D8F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-[#2A9D8F]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">Enter your password to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-colors"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            
            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{authError}</p>
              </div>
            )}
            
            <Button
              type="submit"
              disabled={loggingIn || !password}
              className="w-full bg-[#2A9D8F] hover:bg-[#238b7e] text-white py-3 cursor-pointer"
            >
              {loggingIn ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              &larr; Back to website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A9D8F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/articles" className="text-gray-500 hover:text-gray-700 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-heading text-xl font-bold text-gray-900">Article Management</h1>
              <p className="text-sm text-gray-500">{articles.length} article{articles.length !== 1 ? 's' : ''} total</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={fetchArticles}
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setShowNewForm(!showNewForm)}
              className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <Check className="h-5 w-5 text-green-600 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
            )}
            <p className="font-medium">{message.text}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleUseBlankTemplate}
              variant="outline"
              className="cursor-pointer"
            >
              <FileText className="h-4 w-4 mr-2" />
              New from Template
            </Button>
            <Button
              onClick={() => setShowTemplatePreview(!showTemplatePreview)}
              variant="outline"
              className="cursor-pointer"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showTemplatePreview ? 'Hide' : 'View'} Format Guide
            </Button>
            <Button
              onClick={handleResetToTemplate}
              variant="outline"
              className="text-amber-600 hover:text-amber-700 border-amber-300 hover:border-amber-400 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
          </div>
        </div>

        {/* Template Preview */}
        {showTemplatePreview && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-blue-900 mb-3">Rich Text Editor Guide</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p><strong>H2 button</strong> - Main section headings</p>
              <p><strong>H3 button</strong> - Subsection headings</p>
              <p><strong>B button</strong> - Bold text for emphasis</p>
              <p><strong>I button</strong> - Italic text</p>
              <p><strong>List buttons</strong> - Bullet and numbered lists</p>
              <p><strong>Quote button</strong> - Block quotes</p>
              <p><strong>Link button</strong> - Add hyperlinks (select text first)</p>
              <p className="mt-4 text-blue-700">Use the toolbar buttons to format your content. Press Enter twice for a new paragraph.</p>
            </div>
          </div>
        )}

        {/* New Article Form */}
        {showNewForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg font-bold text-gray-900">Create New Article</h2>
              <button
                onClick={() => setShowNewForm(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateArticle} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                      placeholder="Enter article title"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle / Description
                    </label>
                    <textarea
                      id="subtitle"
                      value={newArticle.subtitle}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, subtitle: e.target.value }))}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none resize-none"
                      placeholder="Brief description shown in article list"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                        Author
                      </label>
                      <input
                        type="text"
                        id="author"
                        value={newArticle.author}
                        onChange={(e) => setNewArticle(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Read Time
                      </label>
                      <input
                        type="text"
                        id="readTime"
                        value={newArticle.readTime}
                        onChange={(e) => setNewArticle(prev => ({ ...prev, readTime: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none text-sm"
                        placeholder="5 min read"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        value={newArticle.category}
                        onChange={(e) => setNewArticle(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={newArticle.featured}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 text-[#2A9D8F] border-gray-300 rounded focus:ring-[#2A9D8F]"
                    />
                    <label htmlFor="featured" className="text-sm text-gray-700">
                      Featured article (shown prominently at top)
                    </label>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image
                  </label>
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2A9D8F] transition-colors cursor-pointer h-48 flex items-center justify-center"
                    onClick={() => newImageInputRef.current?.click()}
                  >
                    {newImagePreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={newImagePreview}
                          alt="Preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            clearNewImage()
                          }}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 cursor-pointer"
                        >
                          <X className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <ImageIcon className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Click or drag image here</p>
                        <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (max 5MB)</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={newImageInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleNewImageSelect}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Article Content
                  </label>
                  <span className="text-xs text-gray-500">
                    {newArticle.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <RichTextEditor
                  content={newArticle.content}
                  onChange={handleContentChange}
                  placeholder="Start writing your article..."
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewForm(false)}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={creating || !newArticle.title.trim()}
                  className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white cursor-pointer"
                >
                  {creating ? 'Creating...' : 'Create Article'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Articles List */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">No Articles Yet</h3>
            <p className="text-gray-600 mb-6">Create your first article to get started.</p>
            <Button
              onClick={handleUseBlankTemplate}
              className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create First Article
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {editingArticle === article.id && editForm ? (
                  // Edit Mode
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">Editing: {article.title}</h3>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveEdit}
                          disabled={saving}
                          size="sm"
                          className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white cursor-pointer"
                        >
                          {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, title: e.target.value } : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={editForm.subtitle}
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, subtitle: e.target.value } : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                          <input
                            type="text"
                            value={editForm.author || ''}
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, author: e.target.value } : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                          <input
                            type="text"
                            value={editForm.readTime || ''}
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, readTime: e.target.value } : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={editForm.category || ''}
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, category: e.target.value } : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none text-sm"
                          />
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editForm.featured}
                              onChange={(e) => setEditForm(prev => prev ? { ...prev, featured: e.target.checked } : null)}
                              className="w-4 h-4 text-[#2A9D8F] border-gray-300 rounded focus:ring-[#2A9D8F]"
                            />
                            <span className="text-sm text-gray-700">Featured</span>
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">Content</label>
                          <span className="text-xs text-gray-500">
                            {editForm.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length} words
                          </span>
                        </div>
                        <RichTextEditor
                          content={editForm.content}
                          onChange={handleEditContentChange}
                          placeholder="Edit your article content..."
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex">
                    {/* Article Image */}
                    <div className="w-48 h-40 relative shrink-0 bg-gray-100">
                      {article.image ? (
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="h-10 w-10 text-gray-300" />
                        </div>
                      )}
                      {uploading === article.id && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Article Info */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {article.featured && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                                Featured
                              </span>
                            )}
                            {article.category && (
                              <span className="text-xs text-[#2A9D8F]">{article.category}</span>
                            )}
                          </div>
                          <h3 className="font-bold text-gray-900 mb-1">{article.title}</h3>
                          {article.subtitle && (
                            <p className="text-sm text-gray-600 line-clamp-2">{article.subtitle}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>{article.author || 'Mo Phanor'}</span>
                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                            <span>{article.readTime || '5 min read'}</span>
                            {article.content && (
                              <span>{article.content.trim().split(/\s+/).length} words</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-1 ml-4">
                          <input
                            ref={el => { fileInputRefs.current[article.id] = el }}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleImageUpload(article.id, file)
                            }}
                            className="hidden"
                          />
                          <button
                            onClick={() => fileInputRefs.current[article.id]?.click()}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="Upload image"
                          >
                            <Upload className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleUseAsTemplate(article)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Copy as template"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditArticle(article)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit article"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <Link
                            href={`/articles?view=${article.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Preview article"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteArticle(article.id)}
                            disabled={deleting === article.id}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                            title="Delete article"
                          >
                            {deleting === article.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Expandable Content Preview */}
                      {article.content && (
                        <div className="mt-3">
                          <button
                            onClick={() => setExpandedContent(expandedContent === article.id ? null : article.id)}
                            className="text-xs text-[#2A9D8F] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            {expandedContent === article.id ? (
                              <>
                                <ChevronUp className="h-3 w-3" />
                                Hide content preview
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-3 w-3" />
                                Show content preview
                              </>
                            )}
                          </button>
                          {expandedContent === article.id && (
                            <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
                              {article.content.slice(0, 2000)}
                              {article.content.length > 2000 && '...'}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
