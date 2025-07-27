"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Settings, Zap, ArrowUpDown, Wallet, X, Check } from "lucide-react"

interface Token {
  symbol: string
  name: string
  logo: string
  balance?: string
  price?: number
}

interface Network {
  name: string
  logo: string
  explorer: string
  explorerName: string
}

const tokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", logo: "🔷", balance: "2.5431", price: 2340.5 },
  { symbol: "USDC", name: "USD Coin", logo: "💵", balance: "1,250.00", price: 1.0 },
  { symbol: "USDT", name: "Tether", logo: "💰", balance: "500.00", price: 1.0 },
  { symbol: "1INCH", name: "1inch", logo: "🦄", balance: "125.50", price: 0.45 },
  { symbol: "UNI", name: "Uniswap", logo: "🦄", balance: "45.20", price: 6.8 },
  { symbol: "LINK", name: "Chainlink", logo: "🔗", balance: "12.80", price: 14.5 },
]

const networks: Record<string, Network> = {
  ethereum: {
    name: "Ethereum",
    logo: "🔷",
    explorer: "https://etherscan.io/tx/",
    explorerName: "Etherscan",
  },
  polygon: {
    name: "Polygon",
    logo: "🟣",
    explorer: "https://polygonscan.com/tx/",
    explorerName: "Polygonscan",
  },
  bsc: {
    name: "BSC",
    logo: "🟡",
    explorer: "https://bscscan.com/tx/",
    explorerName: "BscScan",
  },
  arbitrum: {
    name: "Arbitrum",
    logo: "🔵",
    explorer: "https://arbiscan.io/tx/",
    explorerName: "Arbiscan",
  },
}

export default function OneInchClone() {
  const [fromToken, setFromToken] = useState<Token>(tokens[0])
  const [toToken, setToToken] = useState<Token>(tokens[1])
  const [fromNetwork, setFromNetwork] = useState("ethereum")
  const [toNetwork, setToNetwork] = useState("polygon")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [showFromTokens, setShowFromTokens] = useState(false)
  const [showToTokens, setShowToTokens] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [slippage, setSlippage] = useState("1")
  const [isConnected, setIsConnected] = useState(false)
  const [isSwapping, setIsSwapping] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [fromTxHash, setFromTxHash] = useState("")
  const [toTxHash, setToTxHash] = useState("")

  const handleSwap = () => {
    if (!fromAmount || !isConnected) return

    setIsSwapping(true)
    setTimeout(() => {
      setIsSwapping(false)
      setShowSuccess(true)
      // Generate mock transaction hashes for both networks
      const mockFromHash = "0x" + Math.random().toString(16).substr(2, 64)
      const mockToHash = "0x" + Math.random().toString(16).substr(2, 64)
      setFromTxHash(mockFromHash)
      setToTxHash(mockToHash)
      setFromAmount("")
      setToAmount("")
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  const switchTokens = () => {
    const tempToken = fromToken
    const tempNetwork = fromNetwork
    setFromToken(toToken)
    setToToken(tempToken)
    setFromNetwork(toNetwork)
    setToNetwork(tempNetwork)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  useEffect(() => {
    if (fromAmount && fromToken.price && toToken.price) {
      const calculated = ((Number.parseFloat(fromAmount) * fromToken.price) / toToken.price).toFixed(6)
      setToAmount(calculated)
    } else {
      setToAmount("")
    }
  }, [fromAmount, fromToken, toToken])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">1inch</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Cross-Chain Swap
              </a>
            </nav>
          </div>
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              isConnected
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <Wallet className="w-4 h-4 inline mr-2" />
            {isConnected ? "0x1234...5678" : "Connect Wallet"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-white">Cross-Chain Swap</h1>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* From Token */}
          <div className="space-y-4">
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">From</span>
                <span className="text-sm text-slate-400">
                  Balance: {fromToken.balance} {fromToken.symbol}
                </span>
              </div>

              {/* Network Selector */}
              <div className="mb-3">
                <select
                  value={fromNetwork}
                  onChange={(e) => setFromNetwork(e.target.value)}
                  className="w-full bg-slate-600/50 border border-slate-500/30 rounded-lg px-3 py-2 text-sm text-white outline-none hover:bg-slate-600/70 transition-colors"
                >
                  {Object.entries(networks).map(([key, network]) => (
                    <option key={key} value={key} className="bg-slate-800">
                      {network.logo} {network.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowFromTokens(true)}
                  className="flex items-center space-x-2 bg-slate-600/50 hover:bg-slate-600/70 rounded-lg px-3 py-2 transition-colors"
                >
                  <span className="text-lg">{fromToken.logo}</span>
                  <span className="font-medium text-white">{fromToken.symbol}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                <div className="flex-1">
                  <input
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent text-right text-2xl font-medium text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>
              {fromAmount && (
                <div className="text-right text-sm text-slate-400 mt-1">
                  ≈ ${(Number.parseFloat(fromAmount) * fromToken.price!).toFixed(2)}
                </div>
              )}
            </div>

            {/* Switch Button */}
            <div className="flex justify-center">
              <button
                onClick={switchTokens}
                className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600/30 transition-all duration-200 hover:scale-105"
              >
                <ArrowUpDown className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* To Token */}
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">To</span>
                <span className="text-sm text-slate-400">
                  Balance: {toToken.balance} {toToken.symbol}
                </span>
              </div>

              {/* Network Selector */}
              <div className="mb-3">
                <select
                  value={toNetwork}
                  onChange={(e) => setToNetwork(e.target.value)}
                  className="w-full bg-slate-600/50 border border-slate-500/30 rounded-lg px-3 py-2 text-sm text-white outline-none hover:bg-slate-600/70 transition-colors"
                >
                  {Object.entries(networks).map(([key, network]) => (
                    <option key={key} value={key} className="bg-slate-800">
                      {network.logo} {network.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowToTokens(true)}
                  className="flex items-center space-x-2 bg-slate-600/50 hover:bg-slate-600/70 rounded-lg px-3 py-2 transition-colors"
                >
                  <span className="text-lg">{toToken.logo}</span>
                  <span className="font-medium text-white">{toToken.symbol}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                <div className="flex-1">
                  <input
                    type="number"
                    value={toAmount}
                    readOnly
                    placeholder="0.0"
                    className="w-full bg-transparent text-right text-2xl font-medium text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>
              {toAmount && (
                <div className="text-right text-sm text-slate-400 mt-1">
                  ≈ ${(Number.parseFloat(toAmount) * toToken.price!).toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Route Info */}
          {fromAmount && toAmount && (
            <div className="mt-4 p-3 bg-slate-700/20 rounded-lg border border-slate-600/20">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Rate</span>
                <span className="text-white">
                  1 {fromToken.symbol} = {(toToken.price! / fromToken.price!).toFixed(6)} {toToken.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-slate-400">Bridge Fee</span>
                <span className="text-yellow-400">~$5.50</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-slate-400">Estimated Time</span>
                <span className="text-white">2-5 minutes</span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={!fromAmount || !isConnected || isSwapping}
            className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              !fromAmount || !isConnected
                ? "bg-slate-600/50 text-slate-400 cursor-not-allowed"
                : isSwapping
                  ? "bg-blue-500/50 text-blue-300"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-blue-500/25"
            }`}
          >
            {!isConnected ? "Connect Wallet" : isSwapping ? "Bridging..." : "Bridge & Swap"}
          </button>

          {/* Transaction Details */}
          {(fromTxHash || toTxHash) && (
            <div className="mt-4 p-4 bg-slate-700/20 rounded-lg border border-slate-600/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-300">Cross-Chain Transaction</span>
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Completed</span>
              </div>

              <div className="space-y-4">
                {/* From Network Transaction */}
                {fromTxHash && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400 flex items-center">
                        {networks[fromNetwork].logo} {networks[fromNetwork].name} Transaction
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(fromTxHash)}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-600/20 mb-2">
                      <span className="text-xs font-mono text-slate-300 break-all">{fromTxHash}</span>
                    </div>
                    <button
                      onClick={() => window.open(`${networks[fromNetwork].explorer}${fromTxHash}`, "_blank")}
                      className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      View on {networks[fromNetwork].explorerName}
                    </button>
                  </div>
                )}

                {/* To Network Transaction */}
                {toTxHash && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400 flex items-center">
                        {networks[toNetwork].logo} {networks[toNetwork].name} Transaction
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(toTxHash)}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-600/20 mb-2">
                      <span className="text-xs font-mono text-slate-300 break-all">{toTxHash}</span>
                    </div>
                    <button
                      onClick={() => window.open(`${networks[toNetwork].explorer}${toTxHash}`, "_blank")}
                      className="w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      View on {networks[toNetwork].explorerName}
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    setFromTxHash("")
                    setToTxHash("")
                  }}
                  className="w-full bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear Transaction History
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Token Selection Modal */}
      {(showFromTokens || showToTokens) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-md max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Select Token</h2>
                <button
                  onClick={() => {
                    setShowFromTokens(false)
                    setShowToTokens(false)
                  }}
                  className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {tokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => {
                    if (showFromTokens) {
                      setFromToken(token)
                      setShowFromTokens(false)
                    } else {
                      setToToken(token)
                      setShowToTokens(false)
                    }
                  }}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <span className="text-2xl">{token.logo}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-white">{token.symbol}</div>
                    <div className="text-sm text-slate-400">{token.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white">{token.balance}</div>
                    <div className="text-sm text-slate-400">${token.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-md">
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Slippage Tolerance</label>
                <div className="flex space-x-2">
                  {["0.5", "1", "3"].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippage(value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        slippage === value ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                  <input
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                    placeholder="Custom"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">MEV Protection</span>
                <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-slide-in">
          <Check className="w-5 h-5" />
          <span>Cross-chain swap completed!</span>
        </div>
      )}

      {/* Loading Overlay */}
      {isSwapping && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white font-medium">Processing cross-chain swap...</p>
            <p className="text-slate-400 text-sm mt-1">This may take a few minutes</p>
          </div>
        </div>
      )}
    </div>
  )
}
