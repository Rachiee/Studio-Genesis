"use client"

import React from 'react'
import Link from 'next/link'
import { Twitter, Github, DiscIcon as Discord, Mail, Zap, ExternalLink, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  platform: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Creator Studio', href: '/creator-studio' },
    { name: 'Services', href: '/services' },
    { name: 'Staking', href: '/staking' },
  ],
  resources: [
    { name: 'Documentation', href: '/help/documentation' },
    { name: 'API Reference', href: '/help/api' },
    { name: 'Tutorials', href: '/help/tutorials' },
    { name: 'Community', href: '/community' },
    { name: 'Blog', href: '/blog' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Kit', href: '/press' },
    { name: 'Contact', href: '/contact' },
    { name: 'Partners', href: '/partners' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Security', href: '/security' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/studiogenesis', icon: Twitter },
  { name: 'Discord', href: 'https://discord.gg/studiogenesis', icon: Discord },
  { name: 'GitHub', href: 'https://github.com/studiogenesis', icon: Github },
  { name: 'Email', href: 'mailto:hello@studiogenesis.io', icon: Mail },
]

export function Footer() {
  return (
    <footer className="bg-deep-space border-t border-steel-blue/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary-gradient flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">Studio Genesis</span>
              </div>
              <p className="text-silver-mist text-sm mb-6 max-w-sm">
                The comprehensive Hedera blockchain platform for creators, investors, and innovators. 
                Build, trade, and grow in the decentralized economy.
              </p>
              
              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h4 className="text-pure-white font-semibold text-sm">Stay Updated</h4>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter your email"
                    className="flex-1 bg-carbon-gray border-steel-blue text-sm"
                  />
                  <Button size="sm" className="bg-genesis-purple hover:bg-genesis-purple/90 text-white hover:shadow-lg hover:shadow-genesis-purple/25">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-pure-white font-semibold text-sm mb-4">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-silver-mist hover:text-pure-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-pure-white font-semibold text-sm mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-silver-mist hover:text-pure-white text-sm transition-colors flex items-center"
                    >
                      {link.name}
                      {link.href.startsWith('http') && (
                        <ExternalLink className="ml-1 h-3 w-3" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-pure-white font-semibold text-sm mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-silver-mist hover:text-pure-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-pure-white font-semibold text-sm mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-silver-mist hover:text-pure-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-steel-blue/20" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-silver-mist">
            <span>© 2024 Studio Genesis. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">
              Built with <Heart className="h-3 w-3 mx-1 text-quantum-pink" /> on Hedera
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="sm"
                asChild
                className="text-silver-mist hover:text-pure-white hover:bg-steel-blue/20"
              >
                <Link href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Hedera Network Status */}
        <div className="pb-4">
          <div className="flex items-center justify-center space-x-2 text-xs text-silver-mist">
            <div className="h-2 w-2 rounded-full bg-hedera-green animate-pulse" />
            <span>Hedera Testnet Connected</span>
            <span>•</span>
            <span>Network Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
