'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Calculator, Wallet, RefreshCw, Download, Loader2, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { submitGuideDownload } from "@/app/actions/guide-download"

interface FieldErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  state?: string
  interests?: string
}

export default function MortgageCoachingPage() {
  const forBuyersAnimation = useScrollAnimation()
  const marketInsightsAnimation = useScrollAnimation()
  const bioAnimation = useScrollAnimation()
  const mortgageProgramsAnimation = useScrollAnimation()
  
  // Guide download form state
  const [guideFieldErrors, setGuideFieldErrors] = useState<FieldErrors>({})
  const [guideFormError, setGuideFormError] = useState('')
  const [guideFormSuccess, setGuideFormSuccess] = useState(false)
  const [guideFormLoading, setGuideFormLoading] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [emailTouched, setEmailTouched] = useState(false)
  const [emailValue, setEmailValue] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const checkboxGroupRef = useRef<HTMLDivElement>(null)
  
  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return 'Please enter your email address'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    return ''
  }
  
  const handleEmailBlur = () => {
    setEmailTouched(true)
    const error = validateEmail(emailValue)
    setGuideFieldErrors(prev => ({ ...prev, email: error }))
    setEmailValid(!error)
  }
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmailValue(value)
    if (emailTouched) {
      const error = validateEmail(value)
      setGuideFieldErrors(prev => ({ ...prev, email: error }))
      setEmailValid(!error)
    }
  }
  
  const handleInterestChange = (value: string, checked: boolean) => {
    const newInterests = checked 
      ? [...selectedInterests, value]
      : selectedInterests.filter(i => i !== value)
    setSelectedInterests(newInterests)
    if (newInterests.length > 0) {
      setGuideFieldErrors(prev => ({ ...prev, interests: undefined }))
    }
  }
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      {/* Hero Section */}
      <section className="relative md:min-h-[85vh] md:flex md:items-center overflow-hidden">
        {/* Mobile Hero Image - 9:16 aspect ratio container */}
        <div className="relative w-full aspect-[9/16] md:hidden">
          <Image
            src="/images/hero-mobile.webp"
            alt="Mo Phanor in elegant home entryway"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
        {/* Desktop Hero Image */}
        <Image
          src="/images/hero-mo-entryway-composite.png"
          alt="Mo Phanor in elegant home entryway"
          fill
          className="object-cover object-[85%_center] hidden md:block"
          priority
        />
        {/* Mobile: No card overlay - content is baked into image */}
        {/* Desktop: Show card overlay */}
        <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 hidden md:block">
          <div className="max-w-2xl bg-white/93 backdrop-blur-sm p-10 rounded-xl shadow-lg">
            <div className="inline-block px-4 py-1.5 bg-[#2A9D8F] rounded-full text-xs font-semibold uppercase tracking-wide text-white mb-5">
              Free for First-Time Buyers
            </div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-4 text-balance leading-tight text-black uppercase">
              YOUR FIRST MORTGAGE DESERVES A DECISION COACH.
            </h1>
            <p className="text-black text-lg mb-3 leading-relaxed">
              I use behavioral economics and scenario planning to help first-time buyers compare 2–3 options, understand trade-offs, and avoid payment shock or drained savings.
            </p>
            <p className="text-black/70 text-sm mb-7 italic">
              No jargon. No pressure. Just clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-[#1e3a5f] hover:bg-[#152a45] text-white font-semibold px-10 py-6 text-base">
                <a href="https://calendly.com/talktomo-mophanor/30min" target="_blank" rel="noopener noreferrer">Book a Free Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Free Guide Section */}
      <section id="free-guide" className="py-20 md:py-28 bg-[#0B2545] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2A9D8F] to-[#D4AF37]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Column - Content */}
              <div>
                <div className="inline-block px-4 py-2 bg-[#2A9D8F] rounded-full text-sm font-semibold uppercase tracking-wide mb-6">
                  Free for First-Time Buyers
                </div>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
                  The 7 Cognitive Biases That Cost You Thousands
                </h2>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  These mental traps are normal—and expensive. This guide shows you how to recognize and avoid them before choosing a mortgage.
                </p>
                
                {/* Checklist */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#2A9D8F] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white/90"><span className="font-semibold text-white">Anchoring:</span> Why the first rate you see distorts all future comparisons</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#2A9D8F] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white/90"><span className="font-semibold text-white">Present Bias:</span> How focusing on monthly payment costs you $30K+ over time</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#2A9D8F] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white/90"><span className="font-semibold text-white">Choice Overload:</span> When too many options lead to paralysis or bad decisions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#2A9D8F] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white/90"><span className="font-semibold text-white">Loss Aversion:</span> Why you fear losing money more than gaining it—and how lenders exploit this</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#2A9D8F] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white/90"><span className="font-semibold text-white">Status Quo Bias:</span> The hidden cost of defaulting to your bank</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#2A9D8F] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white/90"><span className="font-semibold text-white">Sunk Cost Fallacy:</span> When to walk away from a pre-approval you invested time in</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#2A9D8F] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white/90"><span className="font-semibold text-white">Recency Bias:</span> How yesterday's rate move shouldn't drive today's decision</p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="font-heading text-2xl font-bold text-black mb-6 text-center">Get Your Free Guide</h3>
                
                {guideFormSuccess ? (
                  <div className="text-center py-8" role="alert">
                    <div className="w-16 h-16 bg-[#2A9D8F] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-heading text-xl font-bold text-black mb-2">You're in! Check your inbox for the Buyer's Bias Guide.</h4>
                    <p className="text-gray-600 mb-4">Your download should start automatically.</p>
                    <Button
                      asChild
                      className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white mb-4 cursor-pointer"
                    >
                      <a 
                        href="https://blobs.vusercontent.net/blob/CognitiveBiasGuide_Final-2-NnMS9yxYYBtWBdtEPIMDwWJkpmLB5F.pdf" 
                        download="The-7-Cognitive-Biases-Guide.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Now
                      </a>
                    </Button>
                    <p className="text-sm text-gray-500">Didn't get the email? Check your spam folder or contact Mo directly.</p>
                  </div>
                ) : (
                  <form 
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setGuideFieldErrors({})
                      setGuideFormError('')
                      
                      const formData = new FormData(e.currentTarget)
                      const newErrors: FieldErrors = {}
                      let hasError = false
                      
                      // Validate First Name
                      const firstName = formData.get('firstName')?.toString().trim() || ''
                      if (!firstName) {
                        newErrors.firstName = 'First Name is required'
                        hasError = true
                      }
                      
                      // Validate Last Name
                      const lastName = formData.get('lastName')?.toString().trim() || ''
                      if (!lastName) {
                        newErrors.lastName = 'Last Name is required'
                        hasError = true
                      }
                      
                      // Validate email
                      const email = formData.get('email')?.toString() || ''
                      const emailError = validateEmail(email)
                      if (emailError) {
                        newErrors.email = emailError
                        hasError = true
                      }
                      
                      // Validate Phone Number
                      const phone = formData.get('phone')?.toString().trim() || ''
                      if (!phone) {
                        newErrors.phone = 'Phone Number is required'
                        hasError = true
                      }
                      
                      // Validate State
                      const state = formData.get('state')?.toString().trim() || ''
                      if (!state) {
                        newErrors.state = 'State is required'
                        hasError = true
                      }
                      
                      if (hasError) {
                        setGuideFieldErrors(newErrors)
                        return
                      }
                      
                      setGuideFormLoading(true)
                      
                      // Submit form data
                      const result = await submitGuideDownload(formData)
                      
                      if (result.success) {
                        setGuideFormSuccess(true)
                        // Trigger download
                        const link = document.createElement('a')
                        link.href = 'https://blobs.vusercontent.net/blob/CognitiveBiasGuide_Final-2-NnMS9yxYYBtWBdtEPIMDwWJkpmLB5F.pdf'
                        link.download = 'The-7-Cognitive-Biases-Guide.pdf'
                        link.target = '_blank'
                        link.rel = 'noopener noreferrer'
                        link.click()
                      } else {
                        setGuideFormError(result.message)
                      }
                      
                      setGuideFormLoading(false)
                    }}
                  >
                    {guideFormError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4" role="alert">
                        <p className="text-red-800 font-medium text-sm">{guideFormError}</p>
                        <p className="text-red-700 text-sm mt-1">Please try again or contact Mo at 404-692-2444.</p>
                      </div>
                    )}
                    
                    {/* First Name Field */}
                    <div>
                      <label htmlFor="guideFirstName" className="sr-only">First Name</label>
                      <input
                        type="text"
                        id="guideFirstName"
                        name="firstName"
                        aria-describedby={guideFieldErrors.firstName ? "guideFirstName-error" : undefined}
                        aria-invalid={!!guideFieldErrors.firstName}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none text-black placeholder:text-[#2A9D8F] placeholder:font-medium transition-colors ${
                          guideFieldErrors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="FIRST NAME *"
                      />
                      {guideFieldErrors.firstName && (
                        <p id="guideFirstName-error" className="text-red-600 text-sm mt-1" role="alert">
                          {guideFieldErrors.firstName}
                        </p>
                      )}
                    </div>
                    
                    {/* Last Name Field */}
                    <div>
                      <label htmlFor="guideLastName" className="sr-only">Last Name</label>
                      <input
                        type="text"
                        id="guideLastName"
                        name="lastName"
                        aria-describedby={guideFieldErrors.lastName ? "guideLastName-error" : undefined}
                        aria-invalid={!!guideFieldErrors.lastName}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none text-black placeholder:text-[#2A9D8F] placeholder:font-medium transition-colors ${
                          guideFieldErrors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="LAST NAME *"
                      />
                      {guideFieldErrors.lastName && (
                        <p id="guideLastName-error" className="text-red-600 text-sm mt-1" role="alert">
                          {guideFieldErrors.lastName}
                        </p>
                      )}
                    </div>
                    
                    {/* Email Field */}
                    <div>
                      <label htmlFor="guideEmail" className="sr-only">Email Address</label>
                      <div className="relative">
                        <input
                          ref={emailRef}
                          type="email"
                          id="guideEmail"
                          name="email"
                          value={emailValue}
                          onChange={handleEmailChange}
                          onBlur={handleEmailBlur}
                          aria-describedby={guideFieldErrors.email ? "guideEmail-error" : undefined}
                          aria-invalid={!!guideFieldErrors.email}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none text-black placeholder:text-[#2A9D8F] placeholder:font-medium transition-colors ${
                            guideFieldErrors.email 
                              ? 'border-red-500 bg-red-50' 
                              : emailValid 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-300'
                          }`}
                          placeholder="EMAIL ADDRESS *"
                        />
                        {emailValid && (
                          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                      </div>
                      {guideFieldErrors.email && (
                        <p id="guideEmail-error" className="text-red-600 text-sm mt-1" role="alert">
                          {guideFieldErrors.email}
                        </p>
                      )}
                    </div>
                    
                    {/* Phone Number Field */}
                    <div>
                      <label htmlFor="guidePhone" className="sr-only">Phone Number</label>
                      <input
                        type="tel"
                        id="guidePhone"
                        name="phone"
                        aria-describedby={guideFieldErrors.phone ? "guidePhone-error" : undefined}
                        aria-invalid={!!guideFieldErrors.phone}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none text-black placeholder:text-[#2A9D8F] placeholder:font-medium transition-colors ${
                          guideFieldErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="PHONE NUMBER *"
                      />
                      {guideFieldErrors.phone && (
                        <p id="guidePhone-error" className="text-red-600 text-sm mt-1" role="alert">
                          {guideFieldErrors.phone}
                        </p>
                      )}
                    </div>
                    
                    {/* State Field */}
                    <div>
                      <label htmlFor="guideState" className="sr-only">State</label>
                      <input
                        type="text"
                        id="guideState"
                        name="state"
                        aria-describedby={guideFieldErrors.state ? "guideState-error" : undefined}
                        aria-invalid={!!guideFieldErrors.state}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none text-black placeholder:text-[#2A9D8F] placeholder:font-medium transition-colors ${
                          guideFieldErrors.state ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="STATE *"
                      />
                      {guideFieldErrors.state && (
                        <p id="guideState-error" className="text-red-600 text-sm mt-1" role="alert">
                          {guideFieldErrors.state}
                        </p>
                      )}
                    </div>
                    
                    {/* Checkbox Group */}
                    <div className="pt-2">
                      <p className="text-sm font-medium text-black mb-3">What are you interested in hearing about? <span className="text-muted-foreground font-normal">(optional)</span></p>
                      <div 
                        ref={checkboxGroupRef}
                        className="space-y-2" 
                        role="group" 
                        aria-labelledby="interests-label"
                        
                        tabIndex={-1}
                      >
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="interests" 
                            value="newsletter" 
                            checked={selectedInterests.includes('newsletter')}
                            onChange={(e) => handleInterestChange('newsletter', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                          />
                          <span className="text-[#2A9D8F]">Newsletter</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="interests" 
                            value="webinar" 
                            checked={selectedInterests.includes('webinar')}
                            onChange={(e) => handleInterestChange('webinar', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                          />
                          <span className="text-[#2A9D8F]">Webinar</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="interests" 
                            value="events" 
                            checked={selectedInterests.includes('events')}
                            onChange={(e) => handleInterestChange('events', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                          />
                          <span className="text-[#2A9D8F]">Upcoming Events</span>
                        </label>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-[#0B2545] hover:bg-[#152a45] text-white font-semibold py-6 text-lg uppercase tracking-wide disabled:opacity-50 cursor-pointer"
                      disabled={guideFormLoading}
                    >
                      {guideFormLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Download for Free'
                      )}
                    </Button>
                  </form>
                )}
                <p className="text-sm text-gray-500 mt-4">
                  By submitting this form, you acknowledge that you have read, understood, and agree to be bound by the <a href="/terms" className="text-[#2A9D8F] font-medium hover:underline">SMS Policy and Terms</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Factors Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 text-balance">
              The mortgage market is noisy. Your decision doesn't have to be.
            </h2>
            <p className="text-lg text-black leading-relaxed max-w-3xl mx-auto">
              Rates, points, terms, programs—there's a lot to consider. But for first-time buyers, only four decisions actually matter:
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8" ref={marketInsightsAnimation.ref}>
            <Card className={`border-2 border-border hover:border-primary transition-all duration-1000 ease-out ${
              marketInsightsAnimation.isVisible 
                ? 'translate-x-0 rotate-0 opacity-100' 
                : '-translate-x-32 -rotate-6 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-black mb-2">Payment Comfort</h3>
                    <p className="text-sm text-black leading-relaxed">
                      Can you sleep at night with this monthly cost?
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`border-2 border-border hover:border-primary transition-all duration-1000 ease-out ${
              marketInsightsAnimation.isVisible 
                ? 'translate-x-0 rotate-0 opacity-100' 
                : '-translate-x-32 -rotate-6 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-black mb-2">Total Cost Over Time</h3>
                    <p className="text-sm text-black leading-relaxed">
                      What do you actually pay over 1, 5, or 10 years?
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`border-2 border-border hover:border-primary transition-all duration-1000 ease-out ${
              marketInsightsAnimation.isVisible 
                ? 'translate-x-0 rotate-0 opacity-100' 
                : '-translate-x-32 -rotate-6 opacity-0'
            }`} style={{ transitionDelay: '600ms' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-black mb-2">Cash Flexibility</h3>
                    <p className="text-sm text-black leading-relaxed">
                      Are you preserving enough emergency savings?
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`border-2 border-border hover:border-primary transition-all duration-1000 ease-out ${
              marketInsightsAnimation.isVisible 
                ? 'translate-x-0 rotate-0 opacity-100' 
                : '-translate-x-32 -rotate-6 opacity-0'
            }`} style={{ transitionDelay: '800ms' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-black mb-2">Future Optionality</h3>
                    <p className="text-sm text-black leading-relaxed">
                      Can you refinance if rates drop, or move if life changes?
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 md:py-28 bg-[#0B2545]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
                Decision Coaching vs. The Traditional Approach
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                The difference isn't the rate. It's whether you actually understood what you were signing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
              {/* Traditional Broker Column */}
              <div className="bg-white/10 border border-white/10 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white/70 uppercase tracking-wide">
                    The Traditional Approach
                  </h3>
                </div>
                <ul className="space-y-5">
                  {[
                    "Pushes one \"best rate\" option",
                    "Commission-driven recommendations",
                    "Focuses on closing the deal fast",
                    "Limited scenario comparison",
                    "You hope you chose right",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <div className="mt-1 w-5 h-5 rounded-full border border-white/25 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-white/60 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decision Coaching Column */}
              <div className="bg-[#2A9D8F] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/hero-mobile.webp')] bg-cover bg-center opacity-5" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wide">
                      Decision Coaching — Mo Phanor
                    </h3>
                  </div>
                  <ul className="space-y-5">
                    {[
                      "Presents 2–3 structured scenarios with real trade-offs",
                      "Uses behavioral economics to remove bias",
                      "Focuses on YOUR financial goals and comfort",
                      "Framework-driven, not product-driven",
                      "You KNOW you chose right",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-4">
                        <div className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white font-medium leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Are You Optimizing For Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 text-balance">
                What are you optimizing for?
              </h2>
              <p className="text-lg text-black leading-relaxed max-w-2xl mx-auto">
                The "best" mortgage isn't a product type—it's the one that aligns with your goals. Start here.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8" ref={mortgageProgramsAnimation.ref}>
              {/* Lowest Monthly Payment */}
              <div className={`group bg-[#F5F5F0] rounded-xl overflow-hidden transition-all duration-300 ease-out h-full p-8 border border-[#E8E4DC] hover:border-[#2A9D8F] hover:shadow-lg hover:-translate-y-1 ${
                mortgageProgramsAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-heading text-xl font-bold text-black mb-3">
                  Lowest Monthly Payment
                </h3>
                <p className="text-black text-sm leading-relaxed mb-4">
                  For buyers who want budget breathing room. Typically involves a 30-year fixed, lower down payment options, and avoiding points to preserve cash flow.
                </p>
                <p className="text-black/60 text-sm italic">
                  Trade-offs: higher total interest paid, slower equity build, possible PMI longer.
                </p>
              </div>

              {/* Lowest Total Cost */}
              <div className={`group bg-[#F5F5F0] rounded-xl overflow-hidden transition-all duration-300 ease-out h-full p-8 border border-[#E8E4DC] hover:border-[#2A9D8F] hover:shadow-lg hover:-translate-y-1 ${
                mortgageProgramsAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '100ms' }}>
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-heading text-xl font-bold text-black mb-3">
                  Lowest Total Cost
                </h3>
                <p className="text-black text-sm leading-relaxed mb-4">
                  For buyers who can handle a higher payment to minimize lifetime interest. Typically involves 15–20-year terms, 20%+ down, and possibly paying points.
                </p>
                <p className="text-black/60 text-sm italic">
                  Trade-offs: higher monthly payment, more cash needed upfront.
                </p>
              </div>

              {/* Maximum Flexibility */}
              <div className={`group bg-[#F5F5F0] rounded-xl overflow-hidden transition-all duration-300 ease-out h-full p-8 border border-[#E8E4DC] hover:border-[#2A9D8F] hover:shadow-lg hover:-translate-y-1 ${
                mortgageProgramsAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '200ms' }}>
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="font-heading text-xl font-bold text-black mb-3">
                  Maximum Flexibility
                </h3>
                <p className="text-black text-sm leading-relaxed mb-4">
                  For buyers who may move, refinance, or pay off early. Typically involves a 30-year term with prepayment ability or an ARM if confident in a 5–7-year timeline.
                </p>
                <p className="text-black/60 text-sm italic">
                  Trade-offs: may not have the lowest rate, rate risk if ARM.
                </p>
              </div>

              {/* Cash Preservation */}
              <div className={`group bg-[#F5F5F0] rounded-xl overflow-hidden transition-all duration-300 ease-out h-full p-8 border border-[#E8E4DC] hover:border-[#2A9D8F] hover:shadow-lg hover:-translate-y-1 ${
                mortgageProgramsAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '300ms' }}>
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-heading text-xl font-bold text-black mb-3">
                  Cash Preservation
                </h3>
                <p className="text-black text-sm leading-relaxed mb-4">
                  For buyers who need to keep emergency savings robust. Typically involves 3–5% down, seller concessions or lender credits, and accepting a slightly higher rate to preserve cash.
                </p>
                <p className="text-black/60 text-sm italic">
                  Trade-offs: PMI costs, higher monthly payment, less initial equity.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-black/70 mb-6">
                Not sure which matters most? That's exactly what the Decision Checkup is for.
              </p>
              <Button size="lg" asChild className="bg-[#1e3a5f] hover:bg-[#152a45] text-white font-semibold px-10 py-6">
                <a href="https://calendly.com/talktomo-mophanor/30min" target="_blank" rel="noopener noreferrer">Book a Free Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
