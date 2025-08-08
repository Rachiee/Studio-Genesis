"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, TrendingUp, Star, Heart, Share2, Eye, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { ANIMATION_VARIANTS } from '@/lib/utils/constants'

const categories = [
  { id: 'all', name: 'All Items', count: 1247 },
  { id: 'art', name: 'Digital Art', count: 456 },
  { id: 'music', name: 'Music', count: 234 },
  { id: 'tokens', name: 'Creator Tokens', count: 189 },
  { id: 'collectibles', name: 'Collectibles', count: 167 },
  { id: 'gaming', name: 'Gaming', count: 123 },
  { id: 'photography', name: 'Photography', count: 78 },
]

const featuredAssets = [
  {
    id: '1',
    title: 'Genesis Abstract #001',
    description: 'First piece in the Genesis Abstract collection',
    price: '250 HBAR',
    usdPrice: '$75.50',
    creator: 'ArtistDAO',
    creatorAvatar: '/placeholder.svg?height=32&width=32',
    image: '/abstract-digital-composition.png',
    category: 'Art',
    likes: 234,
    views: 1567,
    rarity: 'Legendary',
    verified: true,
    trending: true,
  },
  {
    id: '2',
    title: 'SoundWave Token',
    description: 'Creator token for exclusive music access',
    price: '45 HBAR',
    usdPrice: '$13.60',
    creator: 'SoundWave',
    creatorAvatar: '/placeholder.svg?height=32&width=32',
    image: '/music-token-nft.png',
    category: 'Token',
    likes: 189,
    views: 892,
    rarity: 'Epic',
    verified: true,
    trending: false,
  },
  {
    id: '3',
    title: 'Cyber Punk Collection',
    description: 'Futuristic cyberpunk themed artwork',
    price: '180 HBAR',
    usdPrice: '$54.40',
    creator: 'CyberArt',
    creatorAvatar: '/placeholder.svg?height=32&width=32',
    image: '/cyberpunk-digital-art.png',
    category: 'Art',
    likes: 156,
    views: 743,
    rarity: 'Rare',
    verified: false,
    trending: true,
  },
  {
    id: '4',
    title: 'Nature Photography #12',
    description: 'Stunning landscape photography NFT',
    price: '95 HBAR',
    usdPrice: '$28.70',
    creator: 'NatureShots',
    creatorAvatar: '/placeholder.svg?height=32&width=32',
    image: '/nature-photography-collection.png',
    category: 'Photography',
    likes: 98,
    views: 456,
    rarity: 'Common',
    verified: true,
    trending: false,
  },
  {
    id: '5',
    title: 'Gaming Avatar #456',
    description: 'Unique gaming avatar with special abilities',
    price: '320 HBAR',
    usdPrice: '$96.60',
    creator: 'GameForge',
    creatorAvatar: '/placeholder.svg?height=32&width=32',
    image: '/gaming-avatar-nft.png',
    category: 'Gaming',
    likes: 267,
    views: 1234,
    rarity: 'Legendary',
    verified: true,
    trending: true,
  },
  {
    id: '6',
    title: 'Collectible Card Alpha',
    description: 'Limited edition trading card',
    price: '125 HBAR',
    usdPrice: '$37.75',
    creator: 'CardMaster',
    creatorAvatar: '/placeholder.svg?height=32&width=32',
    image: '/collectible-trading-card.png',
    category: 'Collectibles',
    likes: 134,
    views: 678,
    rarity: 'Epic',
    verified: false,
    trending: false,
  },
]

const topCreators = [
  {
    name: 'ArtistDAO',
    avatar: '/placeholder.svg?height=40&width=40',
    totalSales: '12.5K HBAR',
    items: 45,
    verified: true,
  },
  {
    name: 'SoundWave',
    avatar: '/placeholder.svg?height=40&width=40',
    totalSales: '8.7K HBAR',
    items: 23,
    verified: true,
  },
  {
    name: 'CyberArt',
    avatar: '/placeholder.svg?height=40&width=40',
    totalSales: '6.2K HBAR',
    items: 34,
    verified: false,
  },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'Legendary': return 'bg-gradient-to-r from-genesis-purple to-quantum-pink'
    case 'Epic': return 'bg-gradient-to-r from-electric-blue to-genesis-purple'
    case 'Rare': return 'bg-gradient-to-r from-hedera-green to-electric-blue'
    default: return 'bg-steel-blue'
  }
}

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAssets = featuredAssets.filter(asset => {
    const matchesCategory = selectedCategory === 'all' || asset.category.toLowerCase() === selectedCategory
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.creator.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-deep-space">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={ANIMATION_VARIANTS.staggerChildren}
          className="mb-8"
        >
          <motion.div variants={ANIMATION_VARIANTS.fadeIn} className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Marketplace</span>
            </h1>
            <p className="text-xl text-silver-mist max-w-3xl mx-auto">
              Discover, collect, and trade unique digital assets on Hedera blockchain
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={ANIMATION_VARIANTS.fadeIn} className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Input
                placeholder="Search assets, creators, collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-carbon-gray border-steel-blue focus:border-genesis-purple"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-silver-mist" />
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="price-desc">
                <SelectTrigger className="w-40 bg-carbon-gray border-steel-blue">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-carbon-gray border-steel-blue">
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="border-steel-blue hover:bg-genesis-purple/20 hover:border-genesis-purple/50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="flex border border-steel-blue rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Categories */}
              <Card className="bg-carbon-gray border-steel-blue mb-6">
                <CardHeader>
                  <CardTitle className="text-pure-white">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-genesis-purple/20 text-genesis-purple'
                            : 'text-silver-mist hover:text-pure-white hover:bg-steel-blue/20'
                        }`}
                      >
                        <span>{category.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Creators */}
              <Card className="bg-carbon-gray border-steel-blue">
                <CardHeader>
                  <CardTitle className="text-pure-white">Top Creators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCreators.map((creator, index) => (
                      <div key={creator.name} className="flex items-center space-x-3">
                        <div className="text-sm font-bold text-silver-mist w-6">
                          #{index + 1}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                          <AvatarFallback className="bg-primary-gradient text-white text-xs">
                            {creator.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1">
                            <p className="text-sm font-medium text-pure-white truncate">
                              {creator.name}
                            </p>
                            {creator.verified && (
                              <div className="h-3 w-3 rounded-full bg-hedera-green" />
                            )}
                          </div>
                          <p className="text-xs text-silver-mist">
                            {creator.totalSales} • {creator.items} items
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-silver-mist">
                  Showing {filteredAssets.length} of {featuredAssets.length} items
                </p>
              </div>

              {/* Assets Grid */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredAssets.map((asset, index) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="bg-carbon-gray border-steel-blue hover:border-genesis-purple/50 transition-all duration-200 group overflow-hidden">
                      <div className="relative">
                        <div className={`aspect-square ${viewMode === 'list' ? 'w-32 h-32' : ''} relative overflow-hidden`}>
                          <img 
                            src={asset.image || "/placeholder.svg"} 
                            alt={asset.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          {asset.trending && (
                            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-genesis-purple to-quantum-pink text-white border-0">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          <Badge className={`absolute top-3 right-3 ${getRarityColor(asset.rarity)} text-white border-0`}>
                            {asset.rarity}
                          </Badge>
                        </div>
                        
                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                          <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-pure-white mb-1 truncate group-hover:text-white transition-colors duration-200">
                              {asset.title}
                            </h3>
                            <p className="text-sm text-silver-mist mb-2 line-clamp-2">
                              {asset.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={asset.creatorAvatar || "/placeholder.svg"} alt={asset.creator} />
                            <AvatarFallback className="bg-primary-gradient text-white text-xs">
                              {asset.creator.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-silver-mist">by {asset.creator}</span>
                          {asset.verified && (
                            <div className="h-3 w-3 rounded-full bg-hedera-green" />
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-lg font-bold text-hedera-green">{asset.price}</p>
                            <p className="text-xs text-silver-mist">{asset.usdPrice}</p>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-silver-mist">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{asset.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{asset.views}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-genesis-purple hover:bg-genesis-purple/90 text-white">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Buy Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-steel-blue text-pure-white hover:bg-steel-blue/20"
                >
                  Load More Assets
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
