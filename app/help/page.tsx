"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Book, MessageCircle, Mail, Phone, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ANIMATION_VARIANTS } from '@/lib/utils/constants'

const helpOptions = [
  {
    title: 'Documentation',
    description: 'Comprehensive guides and API references',
    icon: Book,
    href: '/help/documentation',
    color: 'from-genesis-purple to-quantum-pink'
  },
  {
    title: 'Community Forum',
    description: 'Connect with other developers and users',
    icon: MessageCircle,
    href: '#',
    color: 'from-hedera-green to-electric-blue'
  },
  {
    title: 'Contact Support',
    description: 'Get direct help from our support team',
    icon: Mail,
    href: '#',
    color: 'from-electric-blue to-genesis-purple'
  }
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-deep-space">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            How can we <span className="gradient-text">help you?</span>
          </motion.h1>
          <motion.p 
            variants={ANIMATION_VARIANTS.fadeIn}
            className="text-xl text-silver-mist max-w-3xl mx-auto"
          >
            Find answers, get support, and learn how to make the most of Studio Genesis
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {helpOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="h-full bg-carbon-gray border-steel-blue hover:border-genesis-purple/50 transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <option.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-pure-white group-hover:text-genesis-purple transition-colors">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-silver-mist">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="bg-primary-gradient hover:shadow-lg hover:shadow-genesis-purple/25" asChild>
                    <Link href={option.href}>
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
