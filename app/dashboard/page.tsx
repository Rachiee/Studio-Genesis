"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Wallet, Coins, Users, Activity, Plus, ArrowUpRight, ArrowDownRight, Eye, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useWeb3 } from '@/contexts/web3-context'
import { ANIMATION_VARIANTS } from '@/lib/utils/constants'

const portfolioStats = [
  {
    title: 'Total Portfolio Value',
    value: '$24,567.89',
    change: '+12.34%',
    trend: 'up',
    icon: Wallet,
    color: 'text-hedera-green',
  },
  {
    title: 'Active Positions',
    value: '8',
    change: '+2',
    trend: 'up',
    icon: Coins,
    color: 'text-genesis-purple',
  },
  {
    title: 'Monthly Revenue',
    value: '$3,456.78',
    change: '+23.45%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-electric-blue',
  },
  {
    title: 'Community Size',
    value: '1,234',
    change: '+56',
    trend: 'up',
    icon: Users,
    color: 'text-quantum-pink',
  },
]

const recentActivity = [
  {
    id: '1',
    type: 'purchase',
    title: 'Purchased Digital Art #1234',
    amount: '-150.00 HBAR',
    timestamp: '2 hours ago',
    status: 'completed',
  },
  {
    id: '2',
    type: 'stake',
    title: 'Staked HBAR in Pool Alpha',
    amount: '+500.00 HBAR',
    timestamp: '4 hours ago',
    status: 'completed',
  },
  {
    id: '3',
    type: 'sale',
    title: 'Sold Creator Token XYZ',
    amount: '+75.50 HBAR',
    timestamp: '1 day ago',
    status: 'completed',
  },
  {
    id: '4',
    type: 'service',
    title: 'Service Payment Received',
    amount: '+200.00 HBAR',
    timestamp: '2 days ago',
    status: 'completed',
  },
]

const topAssets = [
  {
    id: '1',
    name: 'Genesis Art Collection',
    symbol: 'GAC',
    value: '$8,234.56',
    change: '+15.67%',
    allocation: 33.5,
    image: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '2',
    name: 'Creator Token Alpha',
    symbol: 'CTA',
    value: '$5,678.90',
    change: '+8.45%',
    allocation: 23.1,
    image: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '3',
    name: 'Staked HBAR',
    symbol: 'sHBAR',
    value: '$4,321.09',
    change: '+5.23%',
    allocation: 17.6,
    image: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '4',
    name: 'Service Tokens',
    symbol: 'SRV',
    value: '$3,456.78',
    change: '+12.34%',
    allocation: 14.1,
    image: '/placeholder.svg?height=40&width=40',
  },
]

const quickActions = [
  { title: 'Buy Assets', href: '/marketplace', icon: Plus, color: 'bg-hedera-green' },
  { title: 'Create Token', href: '/creator-studio/deploy', icon: Coins, color: 'bg-genesis-purple' },
  { title: 'Stake HBAR', href: '/staking', icon: TrendingUp, color: 'bg-electric-blue' },
  { title: 'List Service', href: '/services/create', icon: Users, color: 'bg-quantum-pink' },
]

export default function DashboardPage() {
  const { wallet } = useWeb3()

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
          <motion.div variants={ANIMATION_VARIANTS.fadeIn} className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-pure-white mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-silver-mist">
                {wallet.isConnected 
                  ? `Connected to ${wallet.address}`
                  : 'Connect your wallet to get started'
                }
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button variant="outline" className="border-steel-blue text-pure-white hover:bg-steel-blue/20">
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>
              <Button className="bg-genesis-purple hover:bg-genesis-purple/90 text-white hover:shadow-lg hover:shadow-genesis-purple/25">
                <Plus className="mr-2 h-4 w-4" />
                New Position
              </Button>
            </div>
          </motion.div>

          {/* Portfolio Stats */}
          <motion.div variants={ANIMATION_VARIANTS.fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {portfolioStats.map((stat, index) => (
              <Card key={stat.title} className="bg-carbon-gray border-steel-blue hover:border-genesis-purple/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r from-${stat.color.split('-')[1]}-500/20 to-${stat.color.split('-')[1]}-600/20`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <Badge variant={stat.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                      {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-pure-white">{stat.value}</p>
                    <p className="text-sm text-silver-mist">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Overview */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={ANIMATION_VARIANTS.fadeIn}
            >
              <Card className="bg-carbon-gray border-steel-blue">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-pure-white">Portfolio Overview</CardTitle>
                      <CardDescription>Your asset allocation and performance</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-carbon-gray border-steel-blue">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Export Data</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topAssets.map((asset) => (
                      <div key={asset.id} className="flex items-center justify-between p-4 rounded-lg bg-steel-blue/10 hover:bg-steel-blue/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={asset.image || "/placeholder.svg"} alt={asset.name} />
                            <AvatarFallback className="bg-primary-gradient text-white text-xs">
                              {asset.symbol.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-pure-white">{asset.name}</p>
                            <p className="text-sm text-silver-mist">{asset.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-pure-white">{asset.value}</p>
                          <p className="text-sm text-hedera-green">{asset.change}</p>
                        </div>
                        <div className="w-16">
                          <Progress value={asset.allocation} className="h-2" />
                          <p className="text-xs text-silver-mist mt-1">{asset.allocation}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={ANIMATION_VARIANTS.fadeIn}
            >
              <Card className="bg-carbon-gray border-steel-blue">
                <CardHeader>
                  <CardTitle className="text-pure-white">Recent Activity</CardTitle>
                  <CardDescription>Your latest transactions and interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-steel-blue/10 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-full bg-genesis-purple/20">
                            <Activity className="h-4 w-4 text-genesis-purple" />
                          </div>
                          <div>
                            <p className="font-medium text-pure-white">{activity.title}</p>
                            <p className="text-sm text-silver-mist">{activity.timestamp}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${activity.amount.startsWith('+') ? 'text-hedera-green' : 'text-quantum-pink'}`}>
                            {activity.amount}
                          </p>
                          <Badge variant="outline" className="text-xs border-steel-blue">
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={ANIMATION_VARIANTS.fadeIn}
            >
              <Card className="bg-carbon-gray border-steel-blue">
                <CardHeader>
                  <CardTitle className="text-pure-white">Quick Actions</CardTitle>
                  <CardDescription>Get started with common tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action) => (
                      <Button
                        key={action.title}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center space-y-2 border-steel-blue hover:bg-steel-blue/20"
                        asChild
                      >
                        <Link href={action.href}>
                          <div className={`p-2 rounded-lg ${action.color}`}>
                            <action.icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-sm font-medium text-pure-white">{action.title}</span>
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Market Insights */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={ANIMATION_VARIANTS.fadeIn}
            >
              <Card className="bg-carbon-gray border-steel-blue">
                <CardHeader>
                  <CardTitle className="text-pure-white">Market Insights</CardTitle>
                  <CardDescription>Latest trends and opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-hedera-green/10 border border-hedera-green/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-hedera-green" />
                        <span className="text-sm font-medium text-hedera-green">Trending Up</span>
                      </div>
                      <p className="text-sm text-pure-white">Creator tokens showing 25% average growth this week</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-electric-blue/10 border border-electric-blue/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Coins className="h-4 w-4 text-electric-blue" />
                        <span className="text-sm font-medium text-electric-blue">New Opportunity</span>
                      </div>
                      <p className="text-sm text-pure-white">High-yield staking pools now available with 12% APY</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-quantum-pink/10 border border-quantum-pink/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="h-4 w-4 text-quantum-pink" />
                        <span className="text-sm font-medium text-quantum-pink">Community Growth</span>
                      </div>
                      <p className="text-sm text-pure-white">Service marketplace activity increased by 40%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
