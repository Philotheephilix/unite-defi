# SYNAPSE - Cross-Chain Swap Platform

A comprehensive cross-chain swap platform built on 1inch Fusion+ technology, featuring atomic swaps with HTLC (Hash Time-Locked Contract) security, custom resolver, and automated relayer service.

## 🚀 Quick Navigation

- **[📖 Setup Guide](SETUP.md)** - Complete installation and configuration
- **[🏗️ Architecture](ARCHITECTURE.md)** - Technical system design
- **[🔗 Fusion+ Architecture](FUSION_ARCHITECTURE.md)** - 1inch Fusion+ integration details
- **[🌐 Networks](NETWORKS.md)** - Network configuration and contract addresses
- **[🔌 API Reference](API.md)** - Backend relayer API documentation
- **[⚡ Main LOP Script](scripts/arb-monad-lop.js)** - Primary CLI with 1inch LOP integration
- **[🔄 Direct Swap Script](scripts/cross-chain-swap-real.js)** - Standalone cross-chain swaps

## 🏗️ Architecture Overview

This project implements a secure cross-chain swap system with the following components:

- **Smart Contracts**: 1inch Fusion+ escrow contracts with custom resolver
- **Backend Relayer**: Automated service for cross-chain transaction execution
- **Frontend UI**: Next.js interface for user interactions
- **WETH Contracts**: Wrapped ETH implementation for testing

### Security Features

- **HTLC (Hash Time-Locked Contract)**: Ensures atomic swaps with time-based security
- **Secret Sharing**: Cryptographic secret exchange between chains
- **Escrow Protection**: Funds locked until swap completion or timeout
- **Relayer Automation**: Trusted service handles complex cross-chain operations

## 📁 Project Structure

```
unite-defi/
├── contracts/                 # Smart contracts (1inch Fusion+ based)
│   ├── src/
│   │   ├── Resolver.sol      # Custom resolver for cross-chain operations
│   │   └── TestEscrowFactory.sol # Test factory with additional functions
│   └── lib/                  # 1inch cross-chain swap contracts
├── backend-relayer.js        # Automated relayer service
├── scripts/                  # Deployment and testing scripts
├── tests/                    # Comprehensive test suite
├── ui/                       # Next.js frontend application
├── weth/                     # WETH contract implementation
└── dist/                     # Compiled contract artifacts
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 22+** (required for ES modules)
- **Foundry** for smart contract compilation
- **MetaMask** browser extension
- **Testnet ETH** on Sepolia and Monad testnets
- **USDC tokens** on both chains for testing

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd unite-defi

# Install dependencies
pnpm install

# Install Foundry (if not already installed)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install contract dependencies
forge install
```

### 2. Environment Setup

```bash
# Run the interactive setup script
chmod +x setup-env.sh
./setup-env.sh
```

This will create a `.env` file with:
- `PRIVATE_KEY`: Your wallet private key (needs ETH on both chains)
- `SRC_CHAIN_RPC`: Sepolia RPC endpoint
- `DST_CHAIN_RPC`: Monad testnet RPC endpoint
- `PORT`: Backend server port (default: 3001)

### 3. Compile Contracts

```bash
# Compile all smart contracts
forge build
```

### 4. Start Backend Relayer

```bash
# Start the automated relayer service
node backend-relayer.js
```

The relayer will:
- Deploy contracts on both chains
- Handle cross-chain secret sharing
- Execute swap operations automatically
- Provide REST API endpoints

### 4.1. Direct Cross-Chain Swaps (Alternative)

For direct cross-chain swaps without the relayer service, use the standalone script:

```bash
# Arbitrum Sepolia ↔ Monad Testnet swaps
node scripts/cross-chain-swap-real.js
```

This script supports:
- **Arbitrum Sepolia → Monad Testnet** swaps
- **Monad Testnet → Arbitrum Sepolia** swaps
- Real HTLC validation with cryptographic secrets
- Complete 1inch Fusion+ order flow
- Direct contract interactions

### 5. Start Frontend

```bash
# Navigate to UI directory
cd ui

# Install frontend dependencies
npm install

# Create environment file
cp env-setup.md .env.local
# Edit .env.local with your RPC endpoints

# Start development server
npm run dev
```

## 🔧 Configuration

### Supported Networks

| Network | Chain ID | RPC URL | Status |
|---------|----------|---------|--------|
| Sepolia | 11155111 | Configurable | Source Chain |
| Arbitrum Sepolia | 421614 | Configurable | Primary Destination |
| Monad Testnet | 10143 | https://rpc.testnet.monad.xyz | Alternative Destination |
| Etherlink Testnet | 128123 | https://node.ghostnet.etherlink.com | Alternative Destination |

### Contract Addresses by Network

#### Sepolia (Source Chain)
- **Chain ID**: 11155111
- **Limit Order Protocol**: `0x0aa1A25F4AccAD28eF7069097f605149d4b5E025`
- **WETH**: `0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14`
- **USDC**: `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`

#### Arbitrum Sepolia (Destination Chain)
- **Chain ID**: 421614
- **Limit Order Protocol**: `0x98A320BF204385A4508A043493D41118c8463f13`
- **WETH**: `0x980B62Da83eFf3D4576C647993b0c1D7faf17c73`
- **USDC**: `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d`

#### Monad Testnet (Alternative Destination)
- **Chain ID**: 10143
- **Limit Order Protocol**: `0x4aA294c0B461B454188053a7F055be5807f212B4`
- **WETH**: `0xDA4b0cF402292e44D076ad6b461213c27ff4d1E6`
- **USDC**: `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d`

#### Etherlink Testnet (Alternative Destination)
- **Chain ID**: 128123
- **Limit Order Protocol**: `0x0D0Be0B15F2ba435146FF9bf3397e26D3ffCCc81` (Mock)
- **WETH**: `0x4aA294c0B461B454188053a7F055be5807f212B4`
- **USDC**: `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d`

## 🧪 Testing

### Run All Tests

```bash
# Set RPC URLs and run tests
SRC_CHAIN_RPC=YOUR_SEPOLIA_RPC DST_CHAIN_RPC=YOUR_MONAD_RPC pnpm test
```

## 🔄 Direct Cross-Chain Swaps

### Arbitrum Sepolia ↔ Monad Testnet

For direct cross-chain swaps between Arbitrum Sepolia and Monad Testnet without using the relayer service:

```bash
# Set environment variables
export PRIVATE_KEY=your_private_key
export SRC_CHAIN_RPC=your_arbitrum_sepolia_rpc
export DST_CHAIN_RPC=https://rpc.testnet.monad.xyz

# Run the real cross-chain swap script
node scripts/cross-chain-swap-real.js
```

**Supported Swap Directions:**
- **Arbitrum Sepolia → Monad Testnet**: Set Arbitrum Sepolia as source chain
- **Monad Testnet → Arbitrum Sepolia**: Set Monad as source chain

### Arbitrum Sepolia ↔ Sepolia (Main LOP Script)

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

**Key Features:**
- ✅ **Real HTLC Validation**: Cryptographic secret generation and validation
- ✅ **1inch Fusion+ Integration**: Complete order creation and signing flow
- ✅ **Direct Contract Interaction**: Escrow deployment and management
- ✅ **Atomic Swap Execution**: Proper secret revelation and fund release
- ✅ **Comprehensive Tracking**: Balance verification and transaction monitoring
- ✅ **Security Features**: Time restrictions, caller validation, secret validation

**Script Flow:**
1. **Environment Setup**: Validate RPC connections and user balances
2. **Contract Deployment**: Deploy fresh EscrowFactory and Resolver contracts
3. **Order Creation**: Generate 1inch Fusion+ order with cryptographic signature
4. **HTLC Setup**: Create hashlock and timelock parameters
5. **Escrow Creation**: Deploy source and destination escrow contracts
6. **Fund Locking**: Lock tokens in both escrow contracts
7. **Secret Revelation**: Transmit cryptographic secret between chains
8. **Fund Release**: Atomic withdrawal from both escrow contracts
9. **Verification**: Confirm successful swap completion

**Main LOP Script Flow (arb-monad-lop.js):**
1. **Environment Setup**: Validate RPC connections and user balances
2. **Contract Deployment**: Deploy fresh EscrowFactory and Resolver contracts
3. **Order Creation**: Generate 1inch Fusion+ order with EIP-712 typed data signing
4. **LOP Integration**: Create order structure compatible with 1inch LOP
5. **Direct LOP Testing**: Call `fillOrderArgs` directly on LOP contracts
6. **HTLC Setup**: Create hashlock and timelock parameters
7. **Escrow Creation**: Deploy source and destination escrow contracts
8. **Fund Locking**: Lock tokens in both escrow contracts
9. **Secret Revelation**: Transmit cryptographic secret between chains
10. **Fund Release**: Atomic withdrawal from both escrow contracts
11. **Verification**: Confirm successful swap completion with LOP integration

**Requirements:**
- Node.js 22+
- Private key with ETH on both chains
- USDC tokens on both chains for testing
- Valid RPC endpoints for both networks

### Direct Cross-Chain Swap Testing

For testing direct cross-chain swaps between Arbitrum Sepolia and Monad:

```bash
# Set environment variables
export PRIVATE_KEY=your_private_key
export SRC_CHAIN_RPC=your_arbitrum_sepolia_rpc
export DST_CHAIN_RPC=https://rpc.testnet.monad.xyz

# Run the real cross-chain swap script
node scripts/cross-chain-swap-real.js
```

**Supported Swap Directions:**
- **Arbitrum Sepolia → Monad Testnet**: Set Arbitrum Sepolia as source
- **Monad Testnet → Arbitrum Sepolia**: Set Monad as source

**Features:**
- Real HTLC validation with cryptographic secrets
- Complete 1inch Fusion+ order creation and signing
- Direct escrow contract deployment and interaction
- Atomic swap execution with proper secret revelation
- Comprehensive balance verification and transaction tracking

### Test Categories

- **Unit Tests**: Contract functionality validation
- **Integration Tests**: Cross-chain swap workflows
- **Real Swap Tests**: Actual testnet transactions
- **Custom SDK Tests**: SDK integration validation

### Test Accounts

The system uses predefined test accounts:
- **Owner**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- **User**: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- **Resolver**: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`

## 🔄 Cross-Chain Swap Process

### 1. User Journey (Relayer Service)

1. **Connect Wallet**: MetaMask connection to Sepolia
2. **Deploy Contracts**: One-time factory deployment (if needed)
3. **Check Balances**: View USDC balances on both chains
4. **Enter Amount**: Specify swap amount
5. **Approve Tokens**: Approve USDC spending for relayer
6. **Sign Order**: Create and sign EIP-712 swap order
7. **Track Progress**: Monitor relayer execution via API
8. **Complete**: Receive tokens on destination chain

### 1.1. Direct Cross-Chain Swaps (Arbitrum Sepolia ↔ Monad)

For direct swaps between Arbitrum Sepolia and Monad Testnet:

1. **Set Environment**: Configure private key and RPC endpoints
2. **Run Script**: Execute `cross-chain-swap-real.js`
3. **Order Creation**: 1inch Fusion+ order with signature
4. **Escrow Deployment**: Source and destination escrow creation
5. **Fund Locking**: Tokens locked with HTLC hashlock
6. **Secret Revelation**: Cryptographic secret transmission
7. **Fund Release**: Atomic withdrawal from both escrows
8. **Verification**: Balance confirmation and transaction tracking

### 2. Technical Flow

```
User → Frontend → Backend Relayer → Smart Contracts
  ↓
1. Create HTLC escrow on source chain
2. Generate cryptographic secret
3. Deploy destination escrow with hashlock
4. Execute source chain swap
5. Reveal secret on destination chain
6. Complete destination swap
7. Release funds to user
```

### 3. Security Mechanism

- **Hashlock**: Prevents premature fund release
- **Timelock**: Allows cancellation after timeout
- **Atomic Execution**: Either both swaps succeed or both fail
- **Secret Verification**: Cryptographic proof of swap completion

## 🛠️ Development

### Smart Contracts

#### Resolver.sol
Custom resolver implementing 1inch Fusion+ interface:
- `deploySrc()`: Deploy source escrow with safety deposit
- `deployDst()`: Deploy destination escrow
- `withdraw()`: Withdraw funds using secret
- `cancel()`: Cancel escrow after timeout
- `arbitraryCalls()`: Execute custom transactions

### Scripts

#### cross-chain-swap-real.js
Standalone cross-chain swap script for Arbitrum Sepolia ↔ Monad:
- **Purpose**: Direct cross-chain swaps without relayer service
- **Networks**: Arbitrum Sepolia and Monad Testnet
- **Features**: 
  - Real HTLC validation with cryptographic secrets
  - Complete 1inch Fusion+ order flow
  - Direct escrow contract deployment
  - Atomic swap execution
  - Comprehensive transaction tracking
- **Usage**: `node scripts/cross-chain-swap-real.js`

#### arb-monad-lop.js
**Main CLI script** that runs with 1inch Limit Order Protocol (LOP):
- **Purpose**: Primary cross-chain swap implementation with direct LOP integration
- **Networks**: Arbitrum Sepolia ↔ Sepolia (inverted direction)
- **Features**:
  - **Direct 1inch LOP Integration**: Calls `fillOrderArgs` directly on LOP contracts
  - **EIP-712 Typed Data Signing**: Proper order signing for LOP compatibility
  - **Real HTLC Security**: Cryptographic secrets and hashlock validation
  - **Complete Fusion+ Flow**: Order creation, escrow deployment, secret revelation
  - **Comprehensive Testing**: Tests order with direct LOP contract calls
  - **Inverted Direction**: Arbitrum Sepolia as source, Sepolia as destination
- **Usage**: `node scripts/arb-monad-lop.js`
- **Key Integration**: Direct interaction with deployed LOP contracts on both networks

#### TestEscrowFactory.sol
Extended factory with testing capabilities:
- `createSrcEscrow()`: Direct source escrow creation
- Standard escrow factory functionality

### Backend Relayer

The relayer service (`backend-relayer.js`) provides:

#### API Endpoints
- `POST /api/deploy-factories`: Deploy contracts on both chains
- `POST /api/create-order`: Create swap order with parameters
- `POST /api/execute-swap`: Execute swap with user signature
- `GET /api/swap-status/:id`: Track swap progress

#### Key Features
- Automatic contract deployment
- Cross-chain secret management
- Transaction monitoring and retry logic
- Error handling and recovery
- Real-time status updates

### Frontend Application

#### SwapInterface.tsx
Main component handling:
- Wallet connection (MetaMask)
- Balance loading and display
- Token approval flow
- Order creation and signing
- Real-time status tracking

#### Key Features
- Responsive design with Tailwind CSS
- Real-time balance updates
- Transaction status monitoring
- Error handling and user feedback
- Network switching support

## 🔍 API Reference

### Backend Endpoints

#### Deploy Factories
```http
POST /api/deploy-factories
Content-Type: application/json

{
  "userAddress": "0x..."
}
```

#### Create Order
```http
POST /api/create-order
Content-Type: application/json

{
  "userAddress": "0x...",
  "amount": "1000000",
  "srcChainId": 11155111,
  "dstChainId": 10143
}
```

#### Execute Swap
```http
POST /api/execute-swap
Content-Type: application/json

{
  "orderId": "uuid",
  "signature": "0x...",
  "userAddress": "0x..."
}
```

#### Get Swap Status
```http
GET /api/swap-status/:orderId
```

## 🚨 Security Considerations

### For Users
- Only approve the exact amount needed
- Verify contract addresses before transactions
- Use hardware wallets for large amounts
- Monitor transaction status carefully

### For Developers
- Never commit private keys to version control
- Use environment variables for sensitive data
- Implement proper error handling
- Test thoroughly on testnets before mainnet

### For Relayers
- Secure private key storage
- Implement rate limiting
- Monitor for suspicious activity
- Have backup relayer instances

## 🐛 Troubleshooting

### Common Issues

#### Contract Deployment Fails
```bash
# Check Foundry installation
foundryup

# Clean and rebuild
forge clean
forge build
```

#### RPC Connection Issues
```bash
# Verify RPC endpoints
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  YOUR_RPC_URL
```

#### Frontend Connection Issues
- Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
- Ensure backend relayer is running
- Verify MetaMask network configuration

#### Transaction Failures
- Ensure sufficient ETH for gas fees
- Check token balances and allowances
- Verify network connectivity
- Monitor for nonce conflicts

### Debug Mode

Enable detailed logging:
```bash
# Backend
DEBUG=true node backend-relayer.js

# Frontend
NEXT_PUBLIC_DEBUG=true npm run dev
```

## 📚 Documentation & Implementation

### Project Documentation
- **[SETUP.md](SETUP.md)**: Complete setup guide with environment configuration
- **[API.md](API.md)**: Backend relayer API documentation and endpoints
- **[ARCHITECTURE.md](ARCHITECTURE.md)**: Technical architecture and system design
- **[NETWORKS.md](NETWORKS.md)**: Network configuration, contract addresses, and MetaMask setup
- **[FUSION_ARCHITECTURE.md](FUSION_ARCHITECTURE.md)**: Detailed 1inch Fusion+ architecture and cross-chain integration

### Implementation Files
- **[scripts/cross-chain-swap-real.js](scripts/cross-chain-swap-real.js)**: Direct cross-chain swap script (Arbitrum Sepolia ↔ Monad)
- **[scripts/arb-monad-lop.js](scripts/arb-monad-lop.js)**: Main CLI script with 1inch LOP integration (Arbitrum Sepolia ↔ Sepolia)
- **[backend-relayer.js](backend-relayer.js)**: Automated relayer service for cross-chain swaps
- **[contracts/src/Resolver.sol](contracts/src/Resolver.sol)**: Custom resolver implementing 1inch Fusion+ interface
- **[contracts/src/TestEscrowFactory.sol](contracts/src/TestEscrowFactory.sol)**: Test escrow factory for development
- **[tests/config.js](tests/config.js)**: Network configuration and contract addresses
- **[ui/app/components/SwapInterface.tsx](ui/app/components/SwapInterface.tsx)**: Frontend swap interface component

### External Resources
- [1inch Fusion+ Documentation](https://docs.1inch.io/)
- [Foundry Book](https://book.getfoundry.sh/)
- [Ethers.js Documentation](https://docs.ethers.org/)

### Testnet Resources
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Monad Testnet](https://docs.monad.xyz/)

### Security Audits
- Contracts based on audited 1inch Fusion+ codebase
- Custom resolver follows security best practices
- HTLC mechanism provides atomic swap guarantees

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the test files for examples
- Consult the 1inch Fusion+ documentation

---

