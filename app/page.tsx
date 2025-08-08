"use client"

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Shield, TrendingUp, Users, Coins, Palette, Store, BarChart3, Wallet, Star, CheckCircle, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import Image from 'next/image'
import { ANIMATION_VARIANTS } from '@/lib/utils/constants'

const features = [
  {
    icon: Palette,
    title: 'Creator Studio',
    description: 'Deploy and manage creator tokens with advanced analytics and community tools.',
    color: 'from-quantum-pink to-genesis-purple',
  },
  {
    icon: Store,
    title: 'Asset Marketplace',
    description: 'Trade digital assets with zero-knowledge proofs and instant settlements.',
    color: 'from-hedera-green to-electric-blue',
  },
  {
    icon: Coins,
    title: 'Staking Rewards',
    description: 'Earn passive income through our sophisticated staking mechanisms.',
    color: 'from-electric-blue to-genesis-purple',
  },
  {
    icon: Users,
    title: 'Service Marketplace',
    description: 'Connect with professionals and monetize your skills in the Web3 economy.',
    color: 'from-genesis-purple to-hedera-green',
  },
]

const stats = [
  { label: 'Total Value Locked', value: '$12.5M', change: '+23.4%' },
  { label: 'Active Users', value: '45.2K', change: '+18.7%' },
  { label: 'Transactions', value: '2.1M', change: '+31.2%' },
  { label: 'Creator Tokens', value: '1,247', change: '+42.8%' },
]

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Digital Artist',
    avatar: '/placeholder.svg?height=40&width=40',
    content: 'Studio Genesis transformed how I monetize my art. The creator token feature is revolutionary.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'DeFi Investor',
    avatar: '/placeholder.svg?height=40&width=40',
    content: 'The staking rewards and analytics dashboard are incredibly sophisticated. Best platform I\'ve used.',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Service Provider',
    avatar: '/placeholder.svg?height=40&width=40',
    content: 'The service marketplace opened up new revenue streams. The integration is seamless.',
    rating: 5,
  },
]

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient">
        {/* Background Elements with Parallax */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-genesis-purple/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-hedera-green/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.1, 1, 1.1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-quantum-pink/5 rounded-full blur-3xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        <motion.div 
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ opacity }}
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={ANIMATION_VARIANTS.staggerChildren}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={ANIMATION_VARIANTS.fadeIn} className="mb-8 mt-16">
              <Badge className="bg-primary-gradient text-white border-0 px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-genesis-purple/25">
                🚀 Now Live on Hedera Testnet
              </Badge>
            </motion.div>

            <motion.h1 
              variants={ANIMATION_VARIANTS.fadeIn}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight transition-all duration-500"
            >
              The Future of{' '}
              <span className="gradient-text">Web3 Creation</span>
              <br />
              Starts Here
            </motion.h1>

            <motion.p 
              variants={ANIMATION_VARIANTS.fadeIn}
              className="text-base sm:text-lg lg:text-xl text-silver-mist mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-500"
            >
              Studio Genesis is the comprehensive Hedera blockchain platform empowering creators, 
              investors, and innovators with cutting-edge tools for asset management, token creation, 
              and decentralized services.
            </motion.p>

            <motion.div 
              variants={ANIMATION_VARIANTS.fadeIn}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="bg-primary-gradient hover:shadow-2xl hover:shadow-genesis-purple/25 text-base px-6 py-3 h-auto transition-all duration-300 hover:scale-105 transform group"
                asChild
              >
                <Link href="/dashboard">
                  Launch Platform
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-steel-blue bg-carbon-gray/50 text-pure-white hover:bg-carbon-gray hover:border-genesis-purple/50 hover:text-white text-base px-6 py-3 h-auto backdrop-blur-sm transition-all duration-300 hover:scale-105 transform group"
                onClick={() => {
                  alert('Demo coming soon!')
                }}
              >
                <Play className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              variants={ANIMATION_VARIANTS.fadeIn}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center p-6 rounded-lg bg-carbon-gray/95 backdrop-blur-sm border border-steel-blue/50 transition-all duration-200 hover:bg-carbon-gray hover:border-genesis-purple/50 hover:scale-105 transform shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.15 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-pure-white mb-2 transition-all duration-200">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-silver-mist mb-2 transition-all duration-200">{stat.label}</div>
                  <div className="text-xs text-hedera-green font-medium transition-all duration-200">{stat.change}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-carbon-gray/50 transition-all duration-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive <span className="gradient-text">Web3 Ecosystem</span>
            </motion.h2>
            <motion.p 
              className="text-base lg:text-lg text-silver-mist max-w-3xl mx-auto transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Everything you need to build, trade, and grow in the decentralized economy, 
              powered by Hedera's enterprise-grade blockchain technology.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="h-full bg-carbon-gray border-steel-blue hover:border-genesis-purple/50 transition-all duration-200 group hover:shadow-xl hover:shadow-genesis-purple/10 transform cursor-pointer">
                  <CardHeader className="transition-all duration-200">
                    <motion.div 
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 transition-all duration-200`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <CardTitle className="text-base lg:text-lg text-pure-white group-hover:text-white transition-all duration-200">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-silver-mist transition-all duration-200">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Marketplace Preview */}
      <motion.section 
        className="py-16 lg:py-24 bg-deep-space/50 transition-all duration-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 transition-all duration-500">
              Discover the <span className="gradient-text">Marketplace</span>
            </h2>
            <p className="text-base lg:text-lg text-silver-mist max-w-3xl mx-auto transition-all duration-500">
              Explore trending digital assets, creator tokens, and exclusive collections from top artists and innovators.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {[
              {
                title: "Digital Art Collection",
                price: "150 HBAR",
                creator: "ArtistDAO",
                image: "/digital-art-nft.png",
                category: "Art"
              },
              {
                title: "Creator Token Alpha",
                price: "25 HBAR",
                creator: "CreatorX",
                image: "/creator-token.png",
                category: "Token"
              },
              {
                title: "Music NFT Series",
                price: "75 HBAR",
                creator: "SoundWave",
                image: "/music-nft-concept.png",
                category: "Music"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="bg-carbon-gray border-steel-blue hover:border-genesis-purple/50 transition-all duration-200 group overflow-hidden">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={item.image || "/placeholder.svg"} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <Badge className="absolute top-3 left-3 bg-genesis-purple text-white border-0">
                      {item.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pure-white mb-1 group-hover:text-white transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-sm text-silver-mist mb-3">by {item.creator}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-hedera-green">{item.price}</span>
                      <Button size="sm" className="bg-genesis-purple hover:bg-genesis-purple/90 text-white">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-primary-gradient hover:shadow-2xl hover:shadow-genesis-purple/25 text-base px-6 py-3 h-auto transition-all duration-300 hover:scale-105 transform"
              asChild
            >
              <Link href="/marketplace">
                Explore Marketplace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-carbon-gray/30 transition-all duration-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 transition-all duration-500">
              Trusted by <span className="gradient-text">Creators Worldwide</span>
            </h2>
            <p className="text-base lg:text-lg text-silver-mist max-w-3xl mx-auto transition-all duration-500">
              Join thousands of creators, investors, and innovators who are building 
              the future of Web3 with Studio Genesis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="h-full bg-carbon-gray border-steel-blue hover:border-genesis-purple/50 transition-all duration-500 transform hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.1, duration: 0.3 }}
                        >
                          <Star className="h-4 w-4 text-genesis-purple fill-current transition-all duration-300" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-silver-mist mb-6 italic transition-all duration-300">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-3">
                      <Avatar className="transition-all duration-300 hover:scale-110">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary-gradient text-white">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold text-pure-white transition-all duration-300">{testimonial.name}</div>
                        <div className="text-xs text-silver-mist transition-all duration-300">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 lg:py-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="absolute inset-0 bg-primary-gradient opacity-10"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Build the Future?
            </motion.h2>
            <motion.p 
              className="text-base lg:text-lg text-silver-mist mb-6 lg:mb-8 max-w-2xl mx-auto transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join Studio Genesis today and unlock the full potential of Web3 creation, 
              trading, and innovation on Hedera blockchain.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-primary-gradient hover:shadow-2xl hover:shadow-genesis-purple/25 text-base px-6 py-3 h-auto transition-all duration-300 hover:scale-105 transform group"
                asChild
              >
                <Link href="/dashboard">
                  Get Started Now
                  <Zap className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-steel-blue/50 bg-transparent text-silver-mist hover:text-pure-white hover:bg-steel-blue/10 hover:border-steel-blue text-base px-6 py-3 h-auto transition-all duration-300 hover:scale-105 transform"
                asChild
              >
                <Link href="/help/documentation">
                  View Documentation
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
