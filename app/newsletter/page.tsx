'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { submitNewsletter } from '@/app/actions/newsletter'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface FieldErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  state?: string
  interests?: string
}

export default function NewsletterPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [emailValue, setEmailValue] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const checkboxGroupRef = useRef<HTMLDivElement>(null)
  const imageAnimation = useScrollAnimation()

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
    setFieldErrors(prev => ({ ...prev, email: error }))
    setEmailValid(!error)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmailValue(value)
    if (emailTouched) {
      const error = validateEmail(value)
      setFieldErrors(prev => ({ ...prev, email: error }))
      setEmailValid(!error)
    }
  }

  const handleInterestChange = (value: string, checked: boolean) => {
    const newInterests = checked 
      ? [...selectedInterests, value]
      : selectedInterests.filter(i => i !== value)
    setSelectedInterests(newInterests)
    if (newInterests.length > 0) {
      setFieldErrors(prev => ({ ...prev, interests: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFieldErrors({})
    setFormError('')
    
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
    
    // Validate at least one checkbox
    const interests = formData.getAll('interests')
    if (interests.length === 0) {
      newErrors.interests = 'Please select at least one option'
      hasError = true
    }
    
    if (hasError) {
      setFieldErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    const result = await submitNewsletter(formData)
    
    setIsSubmitting(false)
    
    if (result.success) {
      setIsSubmitted(true)
    } else {
      setFormError(result.message)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <SiteNav />

      {/* Newsletter Signup Hero */}
      <section className="py-12 md:py-20 pt-24 md:pt-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image */}
              <div className={`relative h-[300px] md:h-[500px] rounded-lg overflow-hidden transition-all duration-[2000ms] order-2 md:order-1 ${
                imageAnimation.isVisible 
                  ? 'opacity-100 scale-105' 
                  : 'opacity-0 scale-100'
              }`} ref={imageAnimation.ref}>
                <div className={`absolute inset-0 bg-accent z-10 transition-all duration-[2000ms] ease-in-out ${
                  imageAnimation.isVisible 
                    ? 'translate-x-[110%] opacity-0' 
                    : 'translate-x-0 opacity-100'
                }`} />
                <Image
                  src="/images/newsletter-hero.jpg"
                  alt="Join our mailing list"
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Form */}
              <div className="order-1 md:order-2">
                {!isSubmitted ? (
                  <div>
                    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6 text-balance">
                      Mortgage insights that actually matter — straight to your inbox.
                    </h1>

                    {formError && (
                      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4" role="alert">
                        <p className="font-medium">{formError}</p>
                        <p className="text-sm mt-1">Please try again or contact Mo at 404-692-2444.</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* First Name Field */}
                      <div>
                        <label htmlFor="newsletterFirstName" className="sr-only">First Name</label>
                        <input
                          type="text"
                          id="newsletterFirstName"
                          name="firstName"
                          aria-describedby={fieldErrors.firstName ? "newsletterFirstName-error" : undefined}
                          aria-invalid={!!fieldErrors.firstName}
                          className={`w-full border-2 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-colors ${
                            fieldErrors.firstName ? 'border-red-500 bg-red-50' : 'border-border'
                          }`}
                          placeholder="FIRST NAME *"
                        />
                        {fieldErrors.firstName && (
                          <p id="newsletterFirstName-error" className="text-red-600 text-sm mt-1" role="alert">
                            {fieldErrors.firstName}
                          </p>
                        )}
                      </div>

                      {/* Last Name Field */}
                      <div>
                        <label htmlFor="newsletterLastName" className="sr-only">Last Name</label>
                        <input
                          type="text"
                          id="newsletterLastName"
                          name="lastName"
                          aria-describedby={fieldErrors.lastName ? "newsletterLastName-error" : undefined}
                          aria-invalid={!!fieldErrors.lastName}
                          className={`w-full border-2 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-colors ${
                            fieldErrors.lastName ? 'border-red-500 bg-red-50' : 'border-border'
                          }`}
                          placeholder="LAST NAME *"
                        />
                        {fieldErrors.lastName && (
                          <p id="newsletterLastName-error" className="text-red-600 text-sm mt-1" role="alert">
                            {fieldErrors.lastName}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="newsletterEmail" className="sr-only">Email Address</label>
                        <div className="relative">
                          <input
                            ref={emailRef}
                            type="email"
                            id="newsletterEmail"
                            name="email"
                            value={emailValue}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            aria-describedby={fieldErrors.email ? "newsletterEmail-error" : undefined}
                            aria-invalid={!!fieldErrors.email}
                            className={`w-full border-2 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-colors ${
                              fieldErrors.email 
                                ? 'border-red-500 bg-red-50' 
                                : emailValid 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-border'
                            }`}
                            placeholder="EMAIL ADDRESS *"
                          />
                          {emailValid && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                          )}
                        </div>
                        {fieldErrors.email && (
                          <p id="newsletterEmail-error" className="text-red-600 text-sm mt-1" role="alert">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone Number Field */}
                      <div>
                        <label htmlFor="newsletterPhone" className="sr-only">Phone Number</label>
                        <input
                          type="tel"
                          id="newsletterPhone"
                          name="phone"
                          aria-describedby={fieldErrors.phone ? "newsletterPhone-error" : undefined}
                          aria-invalid={!!fieldErrors.phone}
                          className={`w-full border-2 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-colors ${
                            fieldErrors.phone ? 'border-red-500 bg-red-50' : 'border-border'
                          }`}
                          placeholder="PHONE NUMBER *"
                        />
                        {fieldErrors.phone && (
                          <p id="newsletterPhone-error" className="text-red-600 text-sm mt-1" role="alert">
                            {fieldErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* State Field */}
                      <div>
                        <label htmlFor="newsletterState" className="sr-only">State</label>
                        <input
                          type="text"
                          id="newsletterState"
                          name="state"
                          aria-describedby={fieldErrors.state ? "newsletterState-error" : undefined}
                          aria-invalid={!!fieldErrors.state}
                          className={`w-full border-2 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-colors ${
                            fieldErrors.state ? 'border-red-500 bg-red-50' : 'border-border'
                          }`}
                          placeholder="STATE *"
                        />
                        {fieldErrors.state && (
                          <p id="newsletterState-error" className="text-red-600 text-sm mt-1" role="alert">
                            {fieldErrors.state}
                          </p>
                        )}
                      </div>

                      {/* Checkbox Group */}
                      <div className="pt-4">
                        <p id="interests-label" className="text-sm font-semibold text-foreground mb-4">
                          What are you interested in hearing about? *
                        </p>
                        <div 
                          ref={checkboxGroupRef}
                          className="space-y-3"
                          role="group"
                          aria-labelledby="interests-label"
                          aria-describedby={fieldErrors.interests ? "newsletter-interests-error" : undefined}
                          tabIndex={-1}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="newsletter-opt"
                              name="interests"
                              value="Newsletter"
                              checked={selectedInterests.includes('Newsletter')}
                              onChange={(e) => handleInterestChange('Newsletter', e.target.checked)}
                              className="w-5 h-5 rounded border-gray-300 text-[#2A9D8F] focus:ring-[#2A9D8F]"
                            />
                            <label htmlFor="newsletter-opt" className="text-sm text-muted-foreground cursor-pointer">
                              Newsletter
                            </label>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="webinar-opt"
                              name="interests"
                              value="Webinar"
                              checked={selectedInterests.includes('Webinar')}
                              onChange={(e) => handleInterestChange('Webinar', e.target.checked)}
                              className="w-5 h-5 rounded border-gray-300 text-[#2A9D8F] focus:ring-[#2A9D8F]"
                            />
                            <label htmlFor="webinar-opt" className="text-sm text-muted-foreground cursor-pointer">
                              Webinar
                            </label>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="events-opt"
                              name="interests"
                              value="Upcoming Events"
                              checked={selectedInterests.includes('Upcoming Events')}
                              onChange={(e) => handleInterestChange('Upcoming Events', e.target.checked)}
                              className="w-5 h-5 rounded border-gray-300 text-[#2A9D8F] focus:ring-[#2A9D8F]"
                            />
                            <label htmlFor="events-opt" className="text-sm text-muted-foreground cursor-pointer">
                              Upcoming Events
                            </label>
                          </div>
                        </div>
                        {fieldErrors.interests && (
                          <p id="newsletter-interests-error" className="text-red-600 text-sm mt-2" role="alert">
                            {fieldErrors.interests}
                          </p>
                        )}
                      </div>

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-foreground hover:bg-foreground/90 text-white font-semibold py-6 text-base disabled:opacity-50 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              SUBMITTING...
                            </>
                          ) : (
                            'SUBSCRIBE'
                          )}
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                        By submitting this form, you acknowledge that you have read, understood, and agree to be bound by the{' '}
                        <a href="/terms" className="text-foreground font-semibold hover:underline">
                          SMS Policy and Terms
                        </a>
                        .
                      </p>
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-12" role="alert">
                    <div className="mb-6">
                      <CheckCircle2 className="w-20 h-20 text-[#2A9D8F] mx-auto" />
                    </div>
                    <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
                      Welcome! You've been added to the list.
                    </h2>
                    <p className="text-lg text-muted-foreground mb-4">
                      You'll receive: {selectedInterests.join(', ')}
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">
                      Didn't get a confirmation? Check your spam folder.
                    </p>
                    <Button asChild className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white">
                      <a href="/">Return to Home</a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Decision Coach Section */}
      <section className="py-16 md:py-24 bg-[#F5F5F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
              {/* Photo */}
              <div className="flex-shrink-0">
                <Image
                  src="/images/8j9a3549-001.jpg"
                  alt="Mo Phanor - Mortgage Decision Coach"
                  width={280}
                  height={350}
                  className="rounded-lg shadow-lg"
                />
              </div>

              {/* Bio Text */}
              <div className="flex-1">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-black mb-6">
                  Meet Your Decision Coach
                </h2>
                <div className="space-y-4 text-black/80 leading-relaxed">
                  <p>
                    I&apos;m the Mortgage Decision Coach and MBA-Accredited Mortgage Professional (AMP) who uses behavioral economics to help first-time buyers make confident, bias-free mortgage decisions.
                  </p>
                  <p>
                    After 12+ years in the mortgage industry, I&apos;ve seen the same thing derail buyers: not bad credit or high rates, but decision paralysis. Too many options, too much jargon, and too little guidance on how the brain actually processes big financial choices.
                  </p>
                  <p>
                    That&apos;s why I don&apos;t just walk you through loan products. I bring a structured decision framework that identifies the cognitive biases quietly influencing your choices and replace overwhelm with clarity. The result is a mortgage decision you can stand behind, not just one you survived.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
