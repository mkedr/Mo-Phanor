'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Check, X, AlertCircle } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

export default function WhoIHelpPage() {
  const heroAnimation = useScrollAnimation()
  const isThisYouAnimation = useScrollAnimation()
  const decisionsAnimation = useScrollAnimation()
  const processAnimation = useScrollAnimation()
  const notForAnimation = useScrollAnimation()
  const otherAudiencesAnimation = useScrollAnimation()
  const ctaAnimation = useScrollAnimation()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <SiteNav />

      {/* Hero Section */}
      <section className="relative py-12 md:py-32 pt-24 md:pt-44 bg-foreground overflow-hidden" ref={heroAnimation.ref}>
        <div className={`absolute inset-0 transition-opacity duration-1000 delay-1000 ${
          heroAnimation.isVisible ? 'opacity-20' : 'opacity-0'
        }`}>
          <Image
            src="/images/who-i-help-hero.jpg"
            alt="First-Time Buyers"
            fill
            className="object-cover"
          />
        </div>
        <div className={`absolute inset-0 bg-black transition-all duration-1000 ${
          heroAnimation.isVisible ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className={`absolute inset-y-0 left-0 w-1/2 bg-black transition-transform duration-1000 ease-out ${
            heroAnimation.isVisible ? '-translate-x-full' : 'translate-x-0'
          }`} />
          <div className={`absolute inset-y-0 right-0 w-1/2 bg-black transition-transform duration-1000 ease-out ${
            heroAnimation.isVisible ? 'translate-x-full' : 'translate-x-0'
          }`} />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 text-balance uppercase">
            I Help Anxious First-Time Buyers Make Confident Mortgage Decisions
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            If you're overwhelmed by options, confused by trade-offs, and worried about making a costly mistake—you're exactly who I help.
          </p>
          <Button size="lg" asChild className="bg-[#2A9D8F] hover:bg-[#238276] text-white font-semibold px-10 py-6">
            <a href="https://calendly.com/talktomo-mophanor/30min" target="_blank" rel="noopener noreferrer">Book a Free Consultation</a>
          </Button>
        </div>
      </section>

      {/* Is This You? Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto" ref={isThisYouAnimation.ref}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-12 text-center text-balance">
              Is This You?
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { title: "Paralyzed by options", desc: "Points vs. no points, 15-year vs. 30-year, 5% vs. 20% down" },
                { title: "Confused by trade-offs", desc: "You see the monthly payment but not the total cost or flexibility" },
                { title: "Worried about costly mistakes", desc: "Anchoring on the wrong number, overextending your budget" },
                { title: "Distrustful of sales pressure", desc: "You want coaching, not steering" },
                { title: "Craving clarity", desc: "You want to understand your choice well enough to explain it to someone else" },
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`bg-[#F5F5F0] rounded-xl p-6 transition-all duration-1000 ease-out w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${
                    isThisYouAnimation.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#2A9D8F]/10 rounded-full flex-shrink-0">
                      <Check className="h-5 w-5 text-[#2A9D8F]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-black mb-2">{item.title}</h3>
                      <p className="text-black/70 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Decisions That Actually Matter */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 text-balance">
                The 4 Decisions That Actually Matter
              </h2>
              <p className="text-lg text-black/70 max-w-2xl mx-auto">
                Most buyers focus on rate. These four factors actually determine whether your mortgage works for your life.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8" ref={decisionsAnimation.ref}>
              {/* Payment Comfort - Color A (blue-gray) */}
              <div className={`group bg-[#EDF1F5] border border-[#D8DDE5] rounded-xl p-8 transition-all duration-300 ease-out h-full hover:border-[#2A9D8F] hover:shadow-lg hover:-translate-y-1 ${
                decisionsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <div className="text-4xl mb-4">&#128176;</div>
                <h3 className="font-heading text-xl font-bold text-black mb-3">Payment Comfort</h3>
                <p className="text-black text-sm leading-relaxed mb-4">
                  Your monthly payment across multiple scenarios with different down payments, terms, and rate options.
                </p>
                <p className="text-black/60 text-sm italic">
                  Key trade-off: Lower payment now often means higher total cost over time.
                </p>
              </div>

              {/* Total Cost Over Time - Color B (cream) */}
              <div className={`group bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl p-8 transition-all duration-300 ease-out h-full hover:border-[#2A9D8F] hover:shadow-lg hover:-translate-y-1 ${
                decisionsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '100ms' }}>
                <div className="text-4xl mb-4">&#128202;</div>
                <h3 className="font-heading text-xl font-bold text-black mb-3">Total Cost Over Time</h3>
                <p className="text-black text-sm leading-relaxed mb-4">
                  What you actually pay at 1, 5, and 10 years across each scenario.
                </p>
                <p className="text-black/60 text-sm italic">
                  Key trade-off: The lowest monthly payment is rarely the lowest total cost.
                </p>
              </div>

              {/* Cash Flexibility - Color B (cream) */}
              <div className={`group bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl p-8 transition-all duration-300 ease-out h-full hover:border-[#2A9D8F] hover:shadow-lg hover:-translate-y-1 ${
                decisionsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '200ms' }}>
                <div className="text-4xl mb-4">&#128181;</div>
                <h3 className="font-heading text-xl font-bold text-black mb-3">Cash Flexibility</h3>
                <p className="text-black text-sm leading-relaxed mb-4">
                  How much cash you preserve after closing and how each option affects your emergency buffer.
                </p>
                <p className="text-black/60 text-sm italic">
                  Key trade-off: Putting more down reduces your payment but can leave you cash-vulnerable.
                </p>
              </div>

              {/* Future Optionality - Color A (blue-gray) */}
              <div className={`group bg-[#EDF1F5] border border-[#D8DDE5] rounded-xl p-8 transition-all duration-300 ease-out h-full hover:border-[#2A9D8F] hover:shadow-lg hover:-translate-y-1 ${
                decisionsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '300ms' }}>
                <div className="text-4xl mb-4">&#128260;</div>
                <h3 className="font-heading text-xl font-bold text-black mb-3">Future Optionality</h3>
                <p className="text-black text-sm leading-relaxed mb-4">
                  How easily each scenario allows you to refinance, sell, or pay off early.
                </p>
                <p className="text-black/60 text-sm italic">
                  Key trade-off: Locking into the lowest rate sometimes limits your ability to adapt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto" ref={processAnimation.ref}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-12 text-center text-balance">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Define Your Goals", desc: "Free 15-minute intro call to understand your timeline, budget comfort, and what success looks like for you." },
                { step: "2", title: "Build Your Scenarios", desc: "I create 2–3 real mortgage options with actual numbers—not ballpark estimates." },
                { step: "3", title: "Debias Your Decision", desc: "We apply bias checks and guardrails to protect you from the most common (and expensive) mental traps." },
                { step: "4", title: "Choose With Confidence", desc: "You get a clear recommendation with full rationale. The decision is always yours—I just make sure it's an informed one." },
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-1000 ease-out ${
                    processAnimation.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-black mb-3">{item.title}</h3>
                  <p className="text-black/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who This Isn't For Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto" ref={notForAnimation.ref}>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 text-balance">
                Who This Isn't For
              </h2>
              <p className="text-lg text-black/70">
                I'd rather be upfront about fit than waste your time.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                "Those who only want the absolute lowest rate with no context",
                "Those who have already decided and just need execution",
                "Those who want to be told what to do without understanding the trade-offs",
                "Those who need approval in 48 hours (decision quality takes a little more time)",
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-4 p-4 bg-[#F5F5F0] rounded-lg transition-all duration-1000 ease-out ${
                    notForAnimation.isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="p-1.5 bg-red-100 rounded-full flex-shrink-0">
                    <X className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-black/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Not a First-Time Buyer? Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto" ref={otherAudiencesAnimation.ref}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-12 text-center text-balance">
              Not a First-Time Buyer?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Move-Up Buyers", desc: "Already own a home and navigating the buy-sell timing challenge." },
                { title: "Real Estate Investors", desc: "DSCR, Non-QM, and other investor loan options." },
                { title: "Realtor Partners", desc: "Prefer a mortgage partner who educates your clients, not pressures them." },
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl p-6 border border-border hover:border-[#2A9D8F] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer ${
                    otherAudiencesAnimation.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <h3 className="font-heading font-bold text-lg text-black mb-3">{item.title}</h3>
                  <p className="text-black/70 text-sm leading-relaxed mb-4">{item.desc}</p>
                  <a href="https://calendly.com/talktomo-mophanor/30min" target="_blank" rel="noopener noreferrer" className="text-[#2A9D8F] font-semibold text-sm hover:underline">
                    Let&apos;s Chat &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 bg-foreground text-white">
        <div className="container mx-auto px-4" ref={ctaAnimation.ref}>
          <div className={`text-center mb-12 transition-all duration-1000 ${
            ctaAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-balance">
              Ready to Make a Confident Decision?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Choose how you want to start:
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-300 ${
            ctaAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            {/* Path 1 - Free Resource */}
            <div className="bg-white rounded-xl p-8 text-center flex flex-col">
              <div className="inline-block px-3 py-1 bg-[#2A9D8F]/10 text-[#2A9D8F] text-xs font-semibold uppercase tracking-wide rounded-full mb-4 mx-auto">
                Free Resource
              </div>
              <h3 className="font-heading text-xl font-bold text-black mb-3">Download the Buyer's Bias Guide</h3>
              <p className="text-black/70 text-sm leading-relaxed mb-6 flex-grow">
                7 cognitive traps that cost first-time buyers thousands—and how to avoid them.
              </p>
              <Button asChild className="w-full bg-[#1e3a5f] hover:bg-[#152a45] text-white font-semibold">
                <a href="/#free-guide">Download Free Guide</a>
              </Button>
            </div>

            {/* Path 2 - Free Call */}
            <div className="bg-white rounded-xl p-8 text-center flex flex-col">
              <div className="inline-block px-3 py-1 bg-[#2A9D8F]/10 text-[#2A9D8F] text-xs font-semibold uppercase tracking-wide rounded-full mb-4 mx-auto">
                Free Call
              </div>
              <h3 className="font-heading text-xl font-bold text-black mb-3">Book a 15-Minute Intro Call</h3>
              <p className="text-black/70 text-sm leading-relaxed mb-6 flex-grow">
                No pressure. Just a quick conversation to see if decision coaching is right for you.
              </p>
              <Button asChild className="w-full bg-[#2A9D8F] hover:bg-[#238276] text-white font-semibold">
                    <a href="https://calendly.com/talktomo-mophanor/30min" target="_blank" rel="noopener noreferrer">Book Free Call</a>
              </Button>
            </div>

            {/* Path 3 - Free Newsletter */}
            <div className="bg-white rounded-xl p-8 text-center flex flex-col">
              <div className="inline-block px-3 py-1 bg-[#2A9D8F]/10 text-[#2A9D8F] text-xs font-semibold uppercase tracking-wide rounded-full mb-4 mx-auto">
                Free Newsletter
              </div>
              <h3 className="font-heading text-xl font-bold text-black mb-3">Get Weekly Decision Tips</h3>
              <p className="text-black/70 text-sm leading-relaxed mb-6 flex-grow">
                Bias-resistant mortgage insights delivered every week. Unsubscribe anytime.
              </p>
              <Button asChild className="w-full bg-[#1e3a5f] hover:bg-[#152a45] text-white font-semibold">
                <a href="/newsletter">Join the Newsletter</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </main>
  )
}
