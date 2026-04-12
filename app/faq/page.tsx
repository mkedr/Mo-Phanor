'use client'

import { Button } from '@/components/ui/button'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Calendar, Download, BookOpen } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function FAQPage() {
  const faqSections = [
    {
      title: "About Decision-Making",
      faqs: [
        {
          id: "right-decision",
          question: "How do I know if I'm making the right decision?",
          answer: (
            <div className="space-y-4">
              <p>You don't -- and that's okay. No one knows the future (rates might drop, you might move, life happens). But you CAN make a decision you won't regret by:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Understanding what you're optimizing for (payment, total cost, cash, flexibility)</li>
                <li>Seeing clear trade-offs (lower payment now = higher cost later)</li>
                <li>Checking your biases (are you anchoring? ignoring long-term costs?)</li>
                <li>Applying guardrails (payment shock limits, savings buffers)</li>
              </ul>
              <p>The "right" decision isn't about predicting the future -- it's about choosing intentionally based on YOUR priorities and risk tolerance.</p>
            </div>
          )
        },
        {
          id: "pay-points",
          question: "Should I pay points to buy down my rate?",
          answer: (
            <div className="space-y-4">
              <p>It depends on your break-even timeline and whether you're depleting savings to do it.</p>
              <p><strong>The math:</strong> If you pay $8,000 in points to save $65/month, break-even is 123 months (10.2 years). If you plan to move or refinance in 5-7 years, you lose money.</p>
              <p><strong>The bias:</strong> Present bias makes you want the lower monthly payment NOW, even if it costs more long-term.</p>
              <p><strong>The framework:</strong> I show you break-even month, total cost with/without points at 1, 5, 10 years, and impact on your cash reserves. Then you decide based on your actual timeline and liquidity comfort.</p>
            </div>
          )
        },
        {
          id: "cognitive-biases",
          question: "How do I avoid cognitive biases when choosing a mortgage?",
          answer: (
            <div className="space-y-4">
              <p>You can't avoid them completely (they're hardwired) -- but you can recognize and counteract them. The 7 most expensive biases:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Anchoring:</strong> First rate you see becomes your reference point</li>
                <li><strong>Present bias:</strong> Focus on monthly payment, ignore total cost</li>
                <li><strong>Choice overload:</strong> Too many options leads to paralysis or rushed decision</li>
                <li><strong>Loss aversion:</strong> Fear rate increases more than you value savings</li>
                <li><strong>Status quo bias:</strong> Default to "what everyone does" (30-year fixed, 20% down)</li>
                <li><strong>Sunk cost fallacy:</strong> Stick with a pre-approval just because you started the process</li>
                <li><strong>Recency bias:</strong> Yesterday's rate move drives today's decision</li>
              </ul>
              <p><strong>The antidote:</strong> Structured decision frameworks, side-by-side scenarios, and explicit bias checks.</p>
            </div>
          )
        },
        {
          id: "overthinking",
          question: "What if I'm overthinking this?",
          answer: (
            <div className="space-y-4">
              <p>There's overthinking, and then there's thinking clearly.</p>
              <p><strong>Overthinking:</strong> Comparing 12 lenders for a 0.05% rate difference. Agonizing over every variable for weeks. Trying to time the market perfectly.</p>
              <p><strong>Thinking clearly:</strong> Understanding 4 key trade-offs (payment, cost, cash, flexibility). Checking biases and applying guardrails. Making an intentional choice you can explain.</p>
              <p>Most first-time buyers aren't overthinking -- they're under-structured. They have too much information and not enough framework to process it. That's what decision coaching fixes.</p>
            </div>
          )
        }
      ]
    },
    {
      title: "About Money & Trade-Offs",
      faqs: [
        {
          id: "afford",
          question: "How much house can I actually afford?",
          answer: (
            <div className="space-y-4">
              <p>Other lenders will tell you what you CAN borrow. I help you figure out what you SHOULD borrow.</p>
              <p><strong>The difference:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Can afford:</strong> Max DTI 43-50%, approval up to $500K</li>
                <li><strong>Should afford:</strong> Comfortable payment, emergency reserves, room for life changes</li>
              </ul>
              <p><strong>The framework:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Payment shock test:</strong> Can you handle this payment if income drops 20%?</li>
                <li><strong>Savings buffer:</strong> Do you have 6-12 months reserves after closing?</li>
                <li><strong>Lifestyle test:</strong> Does this payment leave room for travel, savings, life?</li>
              </ul>
              <p>Most people overextend by 10-15% -- not because they're reckless, but because they anchor on the pre-approval max.</p>
            </div>
          )
        },
        {
          id: "payment-vs-cost",
          question: "Is it better to optimize for monthly payment or total cost?",
          answer: (
            <div className="space-y-4">
              <p>Depends on your priorities -- but you need to see BOTH before deciding.</p>
              <p><strong>Optimize for monthly payment:</strong> 30-year term, minimal/no points, lower down payment. Trade-off: Pay $50K-100K more in interest over life of loan.</p>
              <p><strong>Optimize for total cost:</strong> 15-20 year term, pay points, larger down payment. Trade-off: Higher monthly payment, less cash flexibility.</p>
              <p>Most people don't choose -- they default to whatever the lender shows them first (anchoring bias).</p>
              <p><strong>Better approach:</strong> I show you 2-3 scenarios along the spectrum, you choose based on what matters most to YOU.</p>
            </div>
          )
        },
        {
          id: "cash-vs-pmi",
          question: "Should I keep cash for emergencies or put more down to avoid PMI?",
          answer: (
            <div className="space-y-4">
              <p>This is THE classic liquidity vs. cost trade-off.</p>
              <p><strong>More down (20%+ to avoid PMI):</strong> Saves $150-300/month in PMI, lower monthly payment overall. But depletes emergency reserves and leaves less cash for repairs/furnishing.</p>
              <p><strong>Less down (keep reserves):</strong> Maintains 6-12 months emergency fund, gives financial breathing room. But you pay PMI ($150-300/month) and higher total interest.</p>
              <p><strong>The bias:</strong> Loss aversion makes PMI feel like "throwing money away" -- even if depleting savings is riskier.</p>
              <p><strong>The framework:</strong> Run the numbers on PMI cost over expected ownership (drops off at 78-80% LTV), reserves left after closing, and your comfort with liquidity vs. monthly cost.</p>
              <p><strong>Reality:</strong> Most first-time buyers are better off with 10% down + healthy reserves than 20% down + $5K left in the bank.</p>
            </div>
          )
        }
      ]
    },
    {
      title: "About The Process",
      faqs: [
        {
          id: "decision-checkup",
          question: "What's a Decision Checkup?",
          answer: (
            <div className="space-y-4">
              <p>A structured, 4-step process to help you choose a mortgage confidently:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Step 1:</strong> Define your priorities (payment comfort, total cost, cash preservation, flexibility)</li>
                <li><strong>Step 2:</strong> Build 2-3 scenarios with transparent assumptions</li>
                <li><strong>Step 3:</strong> Check for cognitive biases and apply guardrails</li>
                <li><strong>Step 4:</strong> Get a recommendation with rationale -- then YOU decide</li>
              </ul>
            </div>
          )
        },
        {
          id: "know-what-i-want",
          question: "Do I have to know what I want before we talk?",
          answer: (
            <div className="space-y-4">
              <p>Absolutely not. Most first-time buyers are overwhelmed and don't know where to start. That's exactly what the first conversation (15-minute intro) is for: What's making you anxious? What are you optimizing for? No pressure, no obligation -- just clarity on next steps.</p>
            </div>
          )
        },
        {
          id: "disagree",
          question: "What if I disagree with your recommendation?",
          answer: (
            <div className="space-y-4">
              <p>That's completely fine -- and actually healthy.</p>
              <p>My job is to show you transparent scenarios, point out biases, and give you my recommendation with rationale. Your job is to decide what fits YOUR risk tolerance and priorities.</p>
              <p>If you disagree, we talk through why -- and you choose differently. The decision is always yours. This isn't about control -- it's about clarity.</p>
            </div>
          )
        }
      ]
    },
    {
      title: "About Your Specific Situation",
      faqs: [
        {
          id: "complicated-situation",
          question: "What if my income/credit/situation is complicated?",
          answer: (
            <div className="space-y-4">
              <p>Complicated situations benefit MOST from decision coaching. Because when qualifying is tricky, you need to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Understand how underwriters will actually view your profile</li>
                <li>See realistic approval odds BEFORE applying</li>
                <li>Know which loan programs fit your situation</li>
                <li>Avoid wasting time on paths that won't work</li>
              </ul>
              <p>I set realistic expectations upfront -- not false hope.</p>
            </div>
          )
        },
        {
          id: "have-preapproval",
          question: "I already have a pre-approval from my bank. Should I still talk to you?",
          answer: (
            <div className="space-y-4">
              <p>Maybe -- depends on whether you want to see other options. Questions to ask yourself:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Did your bank show you multiple scenarios, or just one option?</li>
                <li>Do you understand the trade-offs (payment vs. cost vs. flexibility)?</li>
                <li>Did they explain how points, term, and down payment affect total cost?</li>
                <li>Are you confident this is the best fit for your goals?</li>
              </ul>
              <p><strong>If yes to all four:</strong> You're probably fine.</p>
              <p><strong>If no to any:</strong> A Decision Checkup might show you better options -- or confirm your bank's loan is the right choice, which is also valuable.</p>
              <p>No obligation to switch -- but worth seeing what you might be missing.</p>
            </div>
          )
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <SiteNav />

      {/* FAQ Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#1e3a5f] to-[#2A9D8F] pt-24 md:pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 text-balance">
              The Questions Anxious First-Time Buyers Actually Ask
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium mb-2">
              And Honest Answers
            </p>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              Skip the generic mortgage FAQs. Here are the real questions -- about biases, trade-offs, and decision quality -- that matter when you're buying your first home.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-16">
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {/* Section Header */}
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-black mb-8 pb-4 border-b-2 border-[#2A9D8F]">
                  {section.title}
                </h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {section.faqs.map((faq) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id}
                      className="border border-border rounded-lg px-6 bg-[#F5F5F0] data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-300"
                    >
                      <AccordionTrigger className="py-5 text-left hover:no-underline [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-[#2A9D8F]">
                        <span className="font-heading text-lg md:text-xl font-bold text-black pr-4">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-black/70 leading-relaxed text-base pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            {/* Still Have Questions - 3 Column CTA */}
            <div className="pt-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-black mb-8 pb-4 border-b-2 border-[#2A9D8F]">
                Still Have Questions?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Book a Call */}
                <div className="bg-[#F5F5F0] rounded-xl p-6 text-center border border-border hover:border-[#2A9D8F] hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="w-12 h-12 bg-[#2A9D8F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-black mb-3">
                    Book a Free 15-Minute Intro
                  </h3>
                  <p className="text-black/70 text-sm leading-relaxed mb-6 flex-1">
                    We'll discuss your situation and see if decision coaching is right for you.
                  </p>
                  <Button asChild className="w-full bg-[#1e3a5f] hover:bg-[#152a45] text-white mt-auto">
                    <a href="https://calendly.com/talktomo-mophanor/30min" target="_blank" rel="noopener noreferrer">
                      Book Your Call
                    </a>
                  </Button>
                </div>

                {/* Download Guide */}
                <div className="bg-[#F5F5F0] rounded-xl p-6 text-center border border-border hover:border-[#2A9D8F] hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="w-12 h-12 bg-[#2A9D8F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-black mb-3">
                    Download the Buyer's Bias Guide
                  </h3>
                  <p className="text-black/70 text-sm leading-relaxed mb-6 flex-1">
                    Learn the 7 cognitive traps that cost first-timers money -- before talking to any lender.
                  </p>
                  <Button asChild className="w-full bg-[#1e3a5f] hover:bg-[#152a45] text-white mt-auto">
                    <a href="/#free-guide">
                      Get the Free Guide
                    </a>
                  </Button>
                </div>

                {/* Browse Articles */}
                <div className="bg-[#F5F5F0] rounded-xl p-6 text-center border border-border hover:border-[#2A9D8F] hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="w-12 h-12 bg-[#2A9D8F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-black mb-3">
                    Browse Articles
                  </h3>
                  <p className="text-black/70 text-sm leading-relaxed mb-6 flex-1">
                    Read decision frameworks and bias breakdowns at your own pace.
                  </p>
                  <Button asChild className="w-full bg-[#1e3a5f] hover:bg-[#152a45] text-white mt-auto">
                    <a href="/articles">
                      Visit the Blog
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
