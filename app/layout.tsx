import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Web3Provider } from '@/contexts/web3-context'
import { ThemeProvider } from '@/contexts/theme-context'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Toaster } from 'sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Studio Genesis - Comprehensive Hedera Blockchain Platform',
  description: 'The ultimate Web3 platform for asset management, creator tokens, staking, and service marketplace on Hedera blockchain.',
  keywords: ['Hedera', 'blockchain', 'Web3', 'NFT', 'DeFi', 'creator tokens', 'staking'],
  authors: [{ name: 'Studio Genesis Team' }],
  creator: 'Studio Genesis',
  publisher: 'Studio Genesis',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://studiogenesis.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://studiogenesis.io',
    title: 'Studio Genesis - Comprehensive Hedera Blockchain Platform',
    description: 'The ultimate Web3 platform for asset management, creator tokens, staking, and service marketplace on Hedera blockchain.',
    siteName: 'Studio Genesis',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Studio Genesis Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Genesis - Comprehensive Hedera Blockchain Platform',
    description: 'The ultimate Web3 platform for asset management, creator tokens, staking, and service marketplace on Hedera blockchain.',
    creator: '@studiogenesis',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-deep-space text-pure-white antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'system'
                if (theme === 'system') {
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                  document.documentElement.classList.add(systemTheme)
                } else {
                  document.documentElement.classList.add(theme)
                }
              } catch (e) {
                document.documentElement.classList.add('dark')
              }
            `,
          }}
        />
        <ThemeProvider>
          <Web3Provider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
