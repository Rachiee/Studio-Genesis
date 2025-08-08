export interface User {
  id: string
  address: string
  username?: string
  avatar?: string
  email?: string
  createdAt: Date
  updatedAt: Date
}

export interface Asset {
  id: string
  tokenId: string
  name: string
  description: string
  image: string
  price: number
  currency: 'HBAR' | 'USD'
  owner: string
  creator: string
  category: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
  createdAt: Date
  updatedAt: Date
}

export interface CreatorToken {
  id: string
  tokenId: string
  name: string
  symbol: string
  totalSupply: number
  currentPrice: number
  marketCap: number
  holders: number
  creator: string
  description: string
  image: string
  socialLinks: {
    twitter?: string
    discord?: string
    website?: string
  }
  analytics: {
    volume24h: number
    priceChange24h: number
    transactions24h: number
  }
  createdAt: Date
}

export interface Service {
  id: string
  title: string
  description: string
  category: string
  provider: string
  price: number
  currency: 'HBAR' | 'USD'
  duration: string
  rating: number
  reviews: number
  tags: string[]
  images: string[]
  deliverables: string[]
  requirements: string[]
  status: 'Active' | 'Paused' | 'Completed'
  createdAt: Date
}

export interface StakingPool {
  id: string
  name: string
  tokenSymbol: string
  apy: number
  totalStaked: number
  totalRewards: number
  minStake: number
  lockPeriod: number
  status: 'Active' | 'Inactive'
  description: string
  risks: string[]
  benefits: string[]
}

export interface Transaction {
  id: string
  hash: string
  type: 'Transfer' | 'Stake' | 'Unstake' | 'Purchase' | 'Sale' | 'Deploy'
  status: 'Pending' | 'Confirmed' | 'Failed'
  amount: number
  currency: string
  from: string
  to: string
  timestamp: Date
  gasUsed?: number
  gasPrice?: number
}

export interface WalletState {
  isConnected: boolean
  address: string | null
  balance: number
  network: string
  provider: any
}

export interface NotificationState {
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    timestamp: Date
    read: boolean
  }>
}
