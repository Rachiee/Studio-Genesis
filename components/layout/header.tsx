"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Wallet, User, Settings, LogOut, Bell, Search, ChevronDown, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useWeb3 } from '@/contexts/web3-context'
import { cn } from '@/lib/utils/cn'
import { ROUTES } from '@/lib/utils/constants'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navigation = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD },
  { name: 'Marketplace', href: ROUTES.MARKETPLACE },
  { name: 'Creator Studio', href: ROUTES.CREATOR_STUDIO },
  { name: 'Services', href: ROUTES.SERVICES },
  { name: 'Staking', href: ROUTES.STAKING },
  { name: 'Analytics', href: ROUTES.ANALYTICS },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { wallet, connectWallet, disconnectWallet, isLoading } = useWeb3()

  const handleWalletAction = () => {
    if (wallet.isConnected) {
      disconnectWallet()
    } else {
      connectWallet()
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-steel-blue/20 bg-deep-space/95 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={ROUTES.HOME} className="flex items-center space-x-2">
              <div className="relative">
                <div className="h-8 w-8 rounded-lg bg-primary-gradient flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-hedera-green animate-pulse" />
              </div>
              <span className="text-xl font-bold gradient-text">Studio Genesis</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-steel-blue/20",
                  pathname === item.href
                    ? "text-genesis-purple bg-genesis-purple/10"
                    : "text-silver-mist hover:text-pure-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Search */}
            <div className="hidden md:block relative">
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative"
                  >
                    <Input
                      placeholder="Search assets, creators, services..."
                      className="w-full pl-10 pr-4 bg-carbon-gray border-steel-blue focus:border-genesis-purple"
                      autoFocus
                      onBlur={() => setIsSearchOpen(false)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-silver-mist" />
                  </motion.div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(true)}
                    className="text-silver-mist hover:text-pure-white hover:bg-steel-blue/20"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-silver-mist hover:text-pure-white hover:bg-steel-blue/20"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-quantum-pink border-0 rounded-full text-white">
                3
              </Badge>
            </Button>

            {/* Wallet Connection */}
            <Button
              onClick={handleWalletAction}
              disabled={isLoading}
              className={cn(
                "relative overflow-hidden transition-all duration-300",
                wallet.isConnected
                  ? "bg-hedera-green hover:bg-hedera-green/90 text-white hover:shadow-lg hover:shadow-hedera-green/25"
                  : "bg-genesis-purple hover:bg-genesis-purple/90 text-white hover:shadow-lg hover:shadow-genesis-purple/25"
              )}
            >
              <div className="flex items-center space-x-2">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline text-white">
                  {isLoading
                    ? "Connecting..."
                    : wallet.isConnected
                    ? `${wallet.balance.toFixed(2)} HBAR`
                    : "Connect Wallet"
                  }
                </span>
              </div>
              {wallet.isConnected && (
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
              )}
            </Button>

            {/* User Menu */}
            {wallet.isConnected && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className="bg-primary-gradient text-white">
                        {wallet.address?.slice(-2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-carbon-gray border-steel-blue" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-pure-white">Account</p>
                      <p className="text-xs text-silver-mist font-mono">
                        {wallet.address}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-steel-blue" />
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.PROFILE} className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.WALLET} className="flex items-center">
                      <Wallet className="mr-2 h-4 w-4" />
                      Wallet
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-steel-blue" />
                  <DropdownMenuItem onClick={disconnectWallet}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-silver-mist hover:text-pure-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-steel-blue/20 py-4"
            >
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-genesis-purple bg-genesis-purple/10"
                        : "text-silver-mist hover:text-pure-white hover:bg-steel-blue/20"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Search */}
              <div className="mt-4 pt-4 border-t border-steel-blue/20">
                <div className="relative">
                  <Input
                    placeholder="Search..."
                    className="w-full pl-10 bg-carbon-gray border-steel-blue"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-silver-mist" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
