"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { WalletState, Transaction } from '@/types'

interface Web3State {
  wallet: WalletState
  transactions: Transaction[]
  isLoading: boolean
  error: string | null
}

interface Web3ContextType extends Web3State {
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  sendTransaction: (to: string, amount: number) => Promise<string>
  refreshBalance: () => Promise<void>
}

const initialState: Web3State = {
  wallet: {
    isConnected: false,
    address: null,
    balance: 0,
    network: 'testnet',
    provider: null,
  },
  transactions: [],
  isLoading: false,
  error: null,
}

type Web3Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CONNECT_WALLET'; payload: Partial<WalletState> }
  | { type: 'DISCONNECT_WALLET' }
  | { type: 'UPDATE_BALANCE'; payload: number }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }

function web3Reducer(state: Web3State, action: Web3Action): Web3State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'CONNECT_WALLET':
      return {
        ...state,
        wallet: { ...state.wallet, ...action.payload, isConnected: true },
        isLoading: false,
        error: null,
      }
    case 'DISCONNECT_WALLET':
      return {
        ...state,
        wallet: initialState.wallet,
        transactions: [],
      }
    case 'UPDATE_BALANCE':
      return {
        ...state,
        wallet: { ...state.wallet, balance: action.payload },
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      }
    default:
      return state
  }
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(web3Reducer, initialState)

  const connectWallet = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      // Mock wallet connection - replace with actual Hedera wallet integration
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockWalletData = {
        address: '0.0.123456',
        balance: 1000.5,
        network: 'testnet',
        provider: { name: 'HashPack' },
      }
      
      dispatch({ type: 'CONNECT_WALLET', payload: mockWalletData })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to connect wallet' })
    }
  }

  const disconnectWallet = () => {
    dispatch({ type: 'DISCONNECT_WALLET' })
  }

  const sendTransaction = async (to: string, amount: number): Promise<string> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      // Mock transaction - replace with actual Hedera transaction
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const transaction: Transaction = {
        id: `tx_${Date.now()}`,
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        type: 'Transfer',
        status: 'Confirmed',
        amount,
        currency: 'HBAR',
        from: state.wallet.address!,
        to,
        timestamp: new Date(),
      }
      
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction })
      dispatch({ type: 'UPDATE_BALANCE', payload: state.wallet.balance - amount })
      dispatch({ type: 'SET_LOADING', payload: false })
      
      return transaction.hash
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Transaction failed' })
      throw error
    }
  }

  const refreshBalance = async () => {
    if (!state.wallet.isConnected) return
    
    try {
      // Mock balance refresh - replace with actual balance query
      const newBalance = Math.random() * 1000 + 500
      dispatch({ type: 'UPDATE_BALANCE', payload: newBalance })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh balance' })
    }
  }

  const value: Web3ContextType = {
    ...state,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    refreshBalance,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}
