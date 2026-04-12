import Image from 'next/image'
import { Phone } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-[#D1D5DB] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-1">MO PHANOR</h3>
              <p className="text-muted-foreground text-xs mb-2">
                NMLS# 2420740
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-1">
                Mortgage Decision Coach<sup className="text-[10px]">™</sup>
              </p>
              <p className="text-muted-foreground text-sm mb-3">
                Company NMLS# 2826
              </p>
              <p className="text-[10px] text-muted-foreground/70 italic">
                Mortgage Decision Coach™ is a brand of Mo Phanor.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://calendly.com/talktomo-mophanor/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Book a Consultation
                  </a>
                </li>
                <li>
                  <a
                    href="https://myloancenter.com/application/new/start/loan-information?code=eLEND&email=moise.phanor@elend.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Apply for Mortgage
                  </a>
                </li>
                <li>
                  <a
                    href="https://elendheloc.com/account/heloc/register?referrer=bc83c916-fd14-4853-8a9c-c2c02db2d9bf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Apply for HELOC
                  </a>
                </li>
                <li><a href="/who-i-help" className="hover:text-primary transition-colors">Who I Help</a></li>
                <li><a href="/articles" className="hover:text-primary transition-colors">Articles</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/newsletter" className="hover:text-primary transition-colors">Newsletter</a></li>
                <li><a href="/#free-guide" className="hover:text-primary transition-colors">Free Guide</a></li>
                <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <a href="tel:404-692-2444" className="hover:text-primary transition-colors block">Direct: 404-692-2444</a>
                    <a href="tel:973-712-5876" className="hover:text-primary transition-colors block mt-1">Office: 973-712-5876</a>
                  </span>
                </p>
                
                {/* Social Media Icons */}
                <div className="flex items-center gap-4 pt-2">
                  <a 
                    href="https://www.linkedin.com/in/mophanor" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#0A66C2] transition-colors duration-200 hover:scale-110 transform"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61578502449388" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#1877F2] transition-colors duration-200 hover:scale-110 transform"
                    aria-label="Facebook"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                    </svg>
                  </a>
                  <a 
                    href="https://open.spotify.com/show/0XegqpnBr9J5P2y8742yJQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#1DB954] transition-colors duration-200 hover:scale-110 transform"
                    aria-label="Spotify"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Licensing Section */}
          <div className="border-t border-border pt-8">
            <div className="text-center mb-6">
              <h4 className="font-heading font-semibold text-foreground mb-3">NMLS Licensing</h4>
              <p className="text-xs text-muted-foreground mb-1">
                Mo Phanor NMLS# 2420740
              </p>
              <p className="text-xs text-muted-foreground mb-1">
                Company NMLS# 2826
              </p>
              <p className="text-xs text-muted-foreground">
                Licensed in: Georgia (GA)
              </p>
            </div>

            {/* Equal Housing Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/images/equal-housing-official.jpg"
                alt="Equal Housing Opportunity"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground mb-4">
              <a href="#" className="hover:text-primary transition-colors">Website Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">Web Policy</a>
            </div>

            <p className="text-xs text-muted-foreground text-center mb-2">
              © 2026 Mo Phanor • All rights reserved
            </p>
            <p className="text-[15px] text-muted-foreground/60 text-center">
              Built by <a href="https://remisimmons.com/" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">RemiSimmons.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
