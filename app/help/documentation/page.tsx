"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Book, Code, Zap, Users, ArrowRight, ExternalLink, Download, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ANIMATION_VARIANTS } from '@/lib/utils/constants'

const documentationSections = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of Studio Genesis and set up your first project',
    icon: Zap,
    articles: [
      'Quick Start Guide',
      'Account Setup',
      'Wallet Connection',
      'First Transaction'
    ],
    color: 'from-genesis-purple to-quantum-pink'
  },
  {
    title: 'Creator Studio',
    description: 'Deploy and manage creator tokens with advanced features',
    icon: Code,
    articles: [
      'Token Deployment',
      'Analytics Dashboard',
      'Community Management',
      'Revenue Tracking'
    ],
    color: 'from-hedera-green to-electric-blue'
  },
  {
    title: 'Marketplace',
    description: 'Trade digital assets and discover new opportunities',
    icon: Users,
    articles: [
      'Asset Trading',
      'Price Discovery',
      'Collection Management',
      'Market Analytics'
    ],
    color: 'from-electric-blue to-genesis-purple'
  },
  {
    title: 'API Reference',
    description: 'Complete API documentation for developers',
    icon: Book,
    articles: [
      'Authentication',
      'Endpoints',
      'SDKs',
      'Rate Limits'
    ],
    color: 'from-quantum-pink to-hedera-green'
  }
]

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-deep-space">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={ANIMATION_VARIANTS.staggerChildren}
          className="text-center mb-12"
        >
          <motion.h1 
            variants={ANIMATION_VARIANTS.fadeIn}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Documentation</span>
          </motion.h1>
          <motion.p 
            variants={ANIMATION_VARIANTS.fadeIn}
            className="text-xl text-silver-mist max-w-3xl mx-auto mb-8"
          >
            Everything you need to build, integrate, and succeed with Studio Genesis
          </motion.p>
          
          {/* Search */}
          <motion.div 
            variants={ANIMATION_VARIANTS.fadeIn}
            className="max-w-md mx-auto relative"
          >
            <Input
              placeholder="Search documentation..."
              className="pl-10 bg-carbon-gray border-steel-blue focus:border-genesis-purple"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-silver-mist" />
          </motion.div>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {documentationSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="h-full bg-carbon-gray border-steel-blue hover:border-genesis-purple/50 transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-pure-white group-hover:text-genesis-purple transition-colors">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-silver-mist">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {section.articles.map((article) => (
                      <div key={article} className="flex items-center justify-between p-2 rounded hover:bg-steel-blue/20 transition-colors">
                        <span className="text-sm text-silver-mist">{article}</span>
                        <ArrowRight className="h-4 w-4 text-genesis-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-pure-white mb-6">Quick Links</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="border-steel-blue text-pure-white hover:bg-genesis-purple/20 hover:border-genesis-purple hover:text-white" asChild>
              <Link href="/help/api">
                <Code className="mr-2 h-4 w-4" />
                API Reference
              </Link>
            </Button>
            <Button variant="outline" className="border-steel-blue text-pure-white hover:bg-electric-blue/20 hover:border-electric-blue hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Download SDK
            </Button>
            <Button variant="outline" className="border-steel-blue text-pure-white hover:bg-hedera-green/20 hover:border-hedera-green hover:text-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
