export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mo Phanor',
    jobTitle: 'Mortgage Decision Coach',
    description: 'MBA-Accredited Mortgage Professional helping first-time homebuyers make confident, bias-free mortgage decisions using behavioral economics.',
    url: 'https://mophanor.com',
    sameAs: [
      'https://www.linkedin.com/in/mophanor',
      'https://www.facebook.com/profile.php?id=61578502449388',
      'https://open.spotify.com/show/0XegqpnBr9J5P2y8742yJQ'
    ],
    knowsAbout: [
      'Mortgage Lending',
      'Behavioral Economics',
      'First-Time Homebuyers',
      'Mortgage Decision Making',
      'Cognitive Biases in Finance'
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Certification',
      name: 'MBA-Accredited Mortgage Professional (AMP)'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Mo Phanor - Mortgage Decision Coach',
    description: 'Expert mortgage coaching using behavioral economics to help first-time homebuyers make confident decisions.',
    url: 'https://mophanor.com',
    telephone: '+1-404-692-2444',
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    serviceType: [
      'Mortgage Consultation',
      'First-Time Homebuyer Coaching',
      'Mortgage Decision Coaching'
    ],
    sameAs: [
      'https://www.linkedin.com/in/mophanor',
      'https://www.facebook.com/profile.php?id=61578502449388'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mo Phanor - Mortgage Decision Coach',
    url: 'https://mophanor.com',
    description: 'Helping first-time homebuyers make confident, bias-free mortgage decisions using behavioral economics.',
    publisher: {
      '@type': 'Person',
      name: 'Mo Phanor'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ArticleSchema({ 
  title, 
  description, 
  publishedAt, 
  image 
}: { 
  title: string
  description: string
  publishedAt: string
  image?: string 
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: 'Mo Phanor'
    },
    publisher: {
      '@type': 'Person',
      name: 'Mo Phanor'
    },
    datePublished: publishedAt,
    ...(image && { image: image })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
