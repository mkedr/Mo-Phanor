import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Subscribe to receive weekly mortgage decision tips, market insights, and behavioral economics strategies for smarter homebuying.',
  openGraph: {
    title: 'Newsletter | Mo Phanor',
    description: 'Weekly mortgage decision tips and behavioral economics strategies for smarter homebuying.',
  },
}

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
