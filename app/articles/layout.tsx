import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles & Resources',
  description: 'Decision frameworks, market context, and mortgage guidance without jargon. Expert articles to help you make confident mortgage decisions.',
  openGraph: {
    title: 'Articles & Resources | Mo Phanor',
    description: 'Decision frameworks, market context, and mortgage guidance without jargon.',
  },
}

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
