'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Phone, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Who I Help', href: '/who-i-help' },
  { label: 'Articles', href: '/articles' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'FAQ', href: '/faq' },
]

export function SiteNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="shrink-0">
            <p className="font-heading text-lg font-bold text-foreground leading-tight">MO PHANOR</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Mortgage Decision Coach<sup className="text-[8px] sm:text-[10px]">™</sup></p>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  pathname === link.href ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a href="tel:404-692-2444" className="hidden xl:flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              404-692-2444
            </a>
            <Button asChild size="sm" className="hidden sm:flex bg-[#2A9D8F] hover:bg-[#238276] text-white font-semibold text-xs px-3 sm:px-4">
              <a
                href="https://myloancenter.com/application/new/start/loan-information?code=eLEND&email=moise.phanor@elend.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply for Mortgage
              </a>
            </Button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === link.href 
                    ? 'text-primary bg-primary/5' 
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-border mt-2 pt-4 flex flex-col gap-3">
              <a 
                href="tel:404-692-2444" 
                className="flex items-center gap-2 py-2 px-4 text-sm text-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                404-692-2444
              </a>
              <Button asChild className="w-full bg-[#2A9D8F] hover:bg-[#238276] text-white font-semibold">
                <a
                  href="https://myloancenter.com/application/new/start/loan-information?code=eLEND&email=moise.phanor@elend.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply for Mortgage
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
