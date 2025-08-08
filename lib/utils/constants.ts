export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  MARKETPLACE: '/marketplace',
  CREATOR_STUDIO: '/creator-studio',
  SERVICES: '/services',
  STAKING: '/staking',
  WALLET: '/wallet',
  PROFILE: '/profile',
  ANALYTICS: '/analytics',
  HELP: '/help',
  DOCUMENTATION: '/help/documentation',
} as const

export const HEDERA_CONFIG = {
  NETWORK: process.env.HEDERA_NETWORK || 'testnet',
  ACCOUNT_ID: process.env.HEDERA_ACCOUNT_ID,
  PRIVATE_KEY: process.env.HEDERA_PRIVATE_KEY,
} as const

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const
