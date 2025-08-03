# Setup Guide - Unite DeFi Cross-Chain Swap Platform

This guide provides detailed step-by-step instructions for setting up and running the Unite DeFi cross-chain swap platform.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js 22+** installed
- [ ] **Git** installed
- [ ] **MetaMask** browser extension
- [ ] **Testnet ETH** on Sepolia (get from [Sepolia Faucet](https://sepoliafaucet.com/))
- [ ] **Testnet ETH** on Monad (get from [Monad Discord](https://discord.gg/monad))
- [ ] **USDC tokens** on both chains for testing
- [ ] **RPC endpoints** for both networks

## 🚀 Step-by-Step Setup

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd unite-defi

# Install Node.js dependencies
pnpm install

# Install Foundry (if not already installed)
curl -L https://foundry.paradigm.xyz | bash
source ~/.bashrc  # or restart your terminal
foundryup

# Install contract dependencies
forge install
```

### Step 2: Environment Configuration

#### Option A: Interactive Setup (Recommended)

```bash
# Make the setup script executable
chmod +x setup-env.sh

# Run interactive setup
./setup-env.sh
```

The script will prompt you for:
- **Private Key**: Your wallet's private key (needs ETH on both chains)
- **Sepolia RPC**: Your Sepolia RPC endpoint
- **Monad RPC**: Your Monad testnet RPC endpoint

#### Option B: Manual Setup

Create a `.env` file in the root directory:

```bash
# Create .env file
cat > .env << EOL
# Cross-Chain Swap Relayer Environment Variables

# Private key for the relayer wallet (needs ETH and USDC on both chains)  
RELAYER_PRIVATE_KEY=your_private_key_here

# RPC endpoints for blockchain connections
SRC_CHAIN_RPC=your_sepolia_rpc_url
DST_CHAIN_RPC=your_monad_rpc_url

# Server configuration
PORT=3001

# Additional for compatibility with existing scripts
PRIVATE_KEY=your_private_key_here
EOL
```

### Step 3: Compile Smart Contracts

```bash
# Compile all contracts
forge build

# Verify compilation was successful
ls dist/contracts/
```

You should see compiled artifacts for:
- `EscrowFactory.sol`
- `Resolver.sol`
- `TestEscrowFactory.sol`
- And other 1inch contracts

### Step 4: Start Backend Relayer

```bash
# Start the relayer service
node backend-relayer.js
```

Expected output:
```
✅ Contract artifacts loaded successfully
🔧 Setting up providers...
📡 Source Chain: Sepolia (11155111)
📡 Destination Chain: Monad Testnet (10143)
🚀 Starting relayer server on port 3001...
✅ Relayer server started successfully
```

### Step 5: Configure Frontend

```bash
# Navigate to UI directory
cd ui

# Install frontend dependencies
npm install

# Create environment file
cp env-setup.md .env.local
```

Edit `.env.local` with your configuration:

```bash
# Frontend Environment Variables
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_SEPOLIA_RPC=your_sepolia_rpc_url
NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC=your_monad_rpc_url
```

### Step 6: Start Frontend

```bash
# Start development server
npm run dev
```

Expected output:
```
> ui@0.1.0 dev
> next dev

  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000
```

## 🔧 Configuration Details

### RPC Endpoints

#### Free RPC Options

**Sepolia:**
- Alchemy: `https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY`
- Infura: `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`
- Public: `https://eth-sepolia.public.blastapi.io`

**Arbitrum Sepolia:**
- Alchemy: `https://arb-sepolia.g.alchemy.com/v2/YOUR_API_KEY`
- Infura: `https://arbitrum-sepolia.infura.io/v3/YOUR_PROJECT_ID`
- Public: `https://arbitrum-sepolia.public.blastapi.io`

**Monad Testnet:**
- Official: `https://rpc.testnet.monad.xyz`
- Alternative: `https://monad-testnet.rpc.thirdweb.com`

**Etherlink Testnet:**
- Official: `https://node.ghostnet.etherlink.com`
- Alternative: `https://testnet.etherlink.com`

### Token Addresses

#### Sepolia Testnet
```javascript
const SEPOLIA_TOKENS = {
  WETH: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
  USDC: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
}
```

#### Arbitrum Sepolia
```javascript
const ARBITRUM_SEPOLIA_TOKENS = {
  WETH: "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73",
  USDC: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
}
```

#### Monad Testnet
```javascript
const MONAD_TOKENS = {
  WETH: "0xDA4b0cF402292e44D076ad6b461213c27ff4d1E6",
  USDC: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
}
```

#### Etherlink Testnet
```javascript
const ETHERLINK_TOKENS = {
  WETH: "0x4aA294c0B461B454188053a7F055be5807f212B4",
  USDC: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
}
```

### Network Configuration

#### MetaMask Network Setup

**Sepolia:**
- Network Name: Sepolia Testnet
- RPC URL: Your Sepolia RPC
- Chain ID: 11155111
- Currency Symbol: ETH
- Block Explorer: https://sepolia.etherscan.io

**Arbitrum Sepolia:**
- Network Name: Arbitrum Sepolia
- RPC URL: Your Arbitrum Sepolia RPC
- Chain ID: 421614
- Currency Symbol: ETH
- Block Explorer: https://sepolia.arbiscan.io

**Monad Testnet:**
- Network Name: Monad Testnet
- RPC URL: https://rpc.testnet.monad.xyz
- Chain ID: 10143
- Currency Symbol: MON
- Block Explorer: https://explorer.testnet.monad.xyz

**Etherlink Testnet:**
- Network Name: Etherlink Testnet
- RPC URL: https://node.ghostnet.etherlink.com
- Chain ID: 128123
- Currency Symbol: XTZ
- Block Explorer: https://testnet.explorer.etherlink.com

## 🧪 Testing Your Setup

### 1. Verify Contract Compilation

```bash
# Check if contracts compiled successfully
forge build --sizes
```

### 2. Test Backend Connection

```bash
# Test if relayer is responding
curl http://localhost:3001/health
```

### 3. Test Frontend Connection

```bash
# Open browser and navigate to
http://localhost:3000
```

### 4. Test Direct Cross-Chain Swaps

For testing direct swaps between Arbitrum Sepolia and Monad:

```bash
# Set environment variables
export PRIVATE_KEY=your_private_key
export SRC_CHAIN_RPC=your_arbitrum_sepolia_rpc
export DST_CHAIN_RPC=https://rpc.testnet.monad.xyz

# Run the real cross-chain swap script
node scripts/cross-chain-swap-real.js
```

**Supported Directions:**
- **Arbitrum Sepolia → Monad**: Set Arbitrum Sepolia as source
- **Monad → Arbitrum Sepolia**: Set Monad as source

### 4.1. Test Main LOP Script (arb-monad-lop.js)

**Main CLI script** with direct 1inch Limit Order Protocol integration:

```bash
# Set environment variables
export PRIVATE_KEY=your_private_key
export SRC_CHAIN_RPC=your_arbitrum_sepolia_rpc
export DST_CHAIN_RPC=your_sepolia_rpc

# Run the main LOP cross-chain swap script
node scripts/arb-monad-lop.js
```

**Key Features:**
- **Direct LOP Integration**: Calls `fillOrderArgs` directly on deployed LOP contracts
- **EIP-712 Signing**: Proper typed data signing for LOP compatibility
- **Inverted Direction**: Arbitrum Sepolia as source, Sepolia as destination
- **Comprehensive Testing**: Tests orders with direct LOP contract calls
- **Real HTLC Security**: Full cryptographic secret validation

### 5. Run Test Suite

```bash
# Run all tests
SRC_CHAIN_RPC=your_sepolia_rpc DST_CHAIN_RPC=your_monad_rpc pnpm test
```

## 🔍 Troubleshooting

### Common Issues and Solutions

#### Issue: "Contract artifacts not found"
```bash
# Solution: Recompile contracts
forge clean
forge build
```

#### Issue: "RPC connection failed"
```bash
# Solution: Test RPC endpoint
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  YOUR_RPC_URL
```

#### Issue: "Insufficient funds"
```bash
# Solution: Get testnet tokens
# Sepolia: https://sepoliafaucet.com/
# Monad: Join Discord and request tokens
```

#### Issue: "MetaMask not connecting"
```bash
# Solution: Check network configuration
# Ensure you're on Sepolia testnet
# Verify MetaMask is unlocked
```

#### Issue: "Backend not starting"
```bash
# Solution: Check environment variables
cat .env
# Ensure all required variables are set
```

### Debug Mode

Enable detailed logging:

```bash
# Backend debug mode
DEBUG=true node backend-relayer.js

# Frontend debug mode
NEXT_PUBLIC_DEBUG=true npm run dev
```

## 📊 Monitoring and Logs

### Backend Logs
The relayer provides detailed logs for:
- Contract deployments
- Transaction execution
- Error handling
- API requests

### Frontend Logs
Check browser console for:
- Wallet connection status
- Transaction status
- API communication
- Error messages

### Network Monitoring
Monitor transactions on:
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- [Monad Explorer](https://explorer.testnet.monad.xyz/)

## 🔒 Security Best Practices

### Private Key Management
- Never commit private keys to version control
- Use environment variables for sensitive data
- Consider using hardware wallets for production
- Regularly rotate private keys

### Network Security
- Use HTTPS RPC endpoints when possible
- Implement rate limiting on your RPC provider
- Monitor for suspicious activity
- Keep dependencies updated

### Testing Security
- Always test on testnets first
- Use small amounts for testing
- Verify contract addresses before transactions
- Monitor transaction status carefully

## 📈 Performance Optimization

### RPC Optimization
- Use dedicated RPC endpoints for better performance
- Implement connection pooling
- Cache frequently accessed data
- Monitor RPC response times

### Frontend Optimization
- Implement proper error boundaries
- Use React.memo for expensive components
- Optimize bundle size
- Implement proper loading states

## 🚀 Production Deployment

### Backend Deployment
```bash
# Build for production
npm run build

# Start production server
npm start

# Use PM2 for process management
pm2 start backend-relayer.js --name "unite-relayer"
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Start production server
npm start

# Or deploy to Vercel/Netlify
vercel --prod
```

### Environment Variables for Production
```bash
# Production .env
NODE_ENV=production
PORT=3001
RELAYER_PRIVATE_KEY=your_production_private_key
SRC_CHAIN_RPC=your_production_sepolia_rpc
DST_CHAIN_RPC=your_production_monad_rpc
```

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review the logs for error messages
3. Verify your configuration
4. Create an issue on GitHub with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Logs (if applicable)

---

**Note**: This setup guide assumes you're running on a Unix-like system (Linux/macOS). For Windows, some commands may need to be adjusted. 