import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Who I Help',
  description: 'I help first-time homebuyers navigate their mortgage decisions with confidence. Learn about my coaching approach and the 4 decisions that actually matter.',
  openGraph: {
    title: 'Who I Help | Mo Phanor',
    description: 'I help first-time homebuyers navigate their mortgage decisions with confidence using behavioral economics.',
  },
}

export default function WhoIHelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
