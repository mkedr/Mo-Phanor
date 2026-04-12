import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about mortgage decision coaching, working with Mo Phanor, and making confident homebuying decisions.',
  openGraph: {
    title: 'FAQ | Mo Phanor',
    description: 'Common questions about mortgage decision coaching and making confident homebuying decisions.',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
