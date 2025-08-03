# 1inch Fusion+ Architecture: Cross-Chain Integration

This document provides a detailed architectural overview of 1inch Fusion+ integration for cross-chain swaps between Arbitrum/Sepolia and Etherlink/Monad networks.

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                               1inch Fusion+ Network                                  │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐                  │
│  │   Resolvers     │    │   Dutch Auction │    │   Order Router  │                  │
│  │   (Competing)   │◄──►│   Mechanism     │◄──►│   & Matching    │                  │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              Cross-Chain Integration                                │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐                  │
│  │   Arbitrum      │    │   Sepolia       │    │   Monad         │                  │
│  │   Sepolia       │◄──►│   (Source)      │◄──►│   Testnet       │                  │
│  │   (L2)          │    │   (L1)          │    │   (Parallel)    │                  │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘                  │
│           │                       │                       │                         │
│           ▼                       ▼                       ▼                         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐                  │
│  │   EscrowFactory │    │   EscrowFactory │    │   EscrowFactory │                  │
│  │   + Resolver    │    │   + Resolver    │    │   + Resolver    │                  │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              Etherlink Integration                                  │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐                  │
│  │   Etherlink     │    │   Mock LOP      │    │   Tezos-based   │                  │
│  │   Testnet       │◄──►│   (Limited)     │◄──►│   Security      │                  │
│  │   (L2)          │    │                 │    │                 │                  │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 Detailed Cross-Chain Flow

### 1. Order Creation & Announcement Phase

```
User → Fusion+ Network → Resolvers → Dutch Auction → Winning Resolver

1. User creates Fusion+ order with:
   - Maker/taker assets (USDC)
   - Making/taking amounts
   - Dutch auction parameters
   - Cryptographic secret generation

2. Order broadcasted to resolver network

3. Multiple resolvers compete in Dutch auction for:
   - Execution speed
   - Gas optimization
   - Success rate
   - Fee structure

4. Winning resolver selected based on best execution parameters
```

### 2. HTLC Setup & Escrow Creation

```
Winning Resolver → HTLC Setup → Escrow Deployment → Fund Locking

1. Generate HTLC Secret:
   - Random 32-byte secret (S)
   - Create hashlock = keccak256(secret)
   - Set timelock parameters

2. Create Source Escrow:
   - Deploy escrow contract with immutables
   - Lock maker tokens with hashlock protection
   - Deterministic address based on parameters

3. Create Destination Escrow:
   - Deploy escrow contract with same parameters
   - Lock taker tokens with same hashlock
   - Ensure atomic execution
```

### 3. Secret Revelation & Fund Release

```
Secret Revelation → Validation → Fund Release → Atomic Completion

1. Reveal Secret on Source Chain:
   - Call withdraw(secret, immutables)
   - Validate hashlock matches keccak256(secret)
   - Check timelock hasn't expired
   - Verify caller authorization

2. Release Source Tokens:
   - User receives tokens from source escrow
   - Secret becomes public on source chain

3. Reveal Same Secret on Destination Chain:
   - Call withdraw(secret, immutables)
   - Same validation process
   - Release destination tokens

4. Atomic Swap Complete:
   - Either both withdrawals succeed
   - Or both fail (no partial execution)

## 🔧 Implementation Details

### Contract Addresses by Network

| Network | LOP Address | EscrowFactory | Resolver | WETH | USDC |
|---------|-------------|---------------|----------|------|------|
| Sepolia | `0x0aa1A25F4AccAD28eF7069097f605149d4b5E025` | Deployed Fresh | Deployed Fresh | `0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14` | `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238` |
| Arbitrum Sepolia | `0x98A320BF204385A4508A043493D41118c8463f13` | Deployed Fresh | Deployed Fresh | `0x980B62Da83eFf3D4576C647993b0c1D7faf17c73` | `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d` |
| Monad Testnet | `0x4aA294c0B461B454188053a7F055be5807f212B4` | Deployed Fresh | Deployed Fresh | `0xDA4b0cF402292e44D076ad6b461213c27ff4d1E6` | `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d` |
| Etherlink Testnet | `0x0D0Be0B15F2ba435146FF9bf3397e26D3ffCCc81` (Mock) | Deployed Fresh | Deployed Fresh | `0x4aA294c0B461B454188053a7F055be5807f212B4` | `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d` |

### Gas Optimization Strategies

#### Arbitrum Sepolia
```javascript
// Optimize for L2
const gasConfig = {
    maxFeePerGas: ethers.parseUnits('0.1', 'gwei'),
    maxPriorityFeePerGas: ethers.parseUnits('0.1', 'gwei'),
    gasLimit: 500000n
}
```

#### Monad Testnet
```javascript
// Leverage parallel execution
const parallelConfig = {
    batchSize: 5,
    parallelTransactions: true,
    gasLimit: 300000n
}
```

#### Etherlink Testnet
```javascript
// Handle gas constraints
const etherlinkConfig = {
    gasLimit: 1000000n, // Higher limit
    retryAttempts: 3,
    backoffStrategy: 'exponential'
}
```

## 🌐 Network-Specific Considerations

### Arbitrum Sepolia (L2)
- **Pros**: Very low gas fees, fast finality, fraud proofs
- **Cons**: Requires bridge for mainnet access
- **Gas Optimization**: Batch transactions, use L2-specific optimizations
- **Security**: Inherits Ethereum security with L2 scaling

### Monad Testnet (Parallel Execution)
- **Pros**: High throughput, parallel transaction processing
- **Cons**: Newer network, limited tooling
- **Optimization**: Leverage parallel execution for multiple operations
- **Security**: Parallel execution security model

### Etherlink Testnet (Tezos-based)
- **Pros**: Low fees, Tezos security model
- **Cons**: Limited LOP support, mock contracts
- **Limitations**: Gas limit constraints, experimental integration
- **Workarounds**: Higher gas limits, retry mechanisms

## 🚀 Performance Optimization

### Cross-Chain Latency Optimization

```
Order Creation → Parallel Escrow Deployment → Concurrent Fund Locking → 
Optimized Secret Transmission → Atomic Fund Release

Optimization Strategies:
├── Parallel Contract Deployment
├── Concurrent RPC Calls
├── Batch Transaction Processing
└── Optimized Gas Estimation
```

### Network-Specific Optimizations

#### Arbitrum Sepolia
- Use L2-specific gas estimation
- Leverage L2 batch processing
- Optimize for L2 fee structure

#### Monad Testnet
- Utilize parallel execution capabilities
- Batch multiple operations
- Optimize for high throughput

#### Etherlink Testnet
- Implement retry mechanisms
- Use higher gas limits
- Monitor transaction status carefully

---

**Note**: This architecture diagram represents the current implementation. The system supports both relayer-based and direct cross-chain swap approaches, with the direct approach being particularly effective for Arbitrum Sepolia ↔ Monad Testnet swaps.

## �� Main CLI Script: arb-monad-lop.js

### Primary LOP Integration Script

The `arb-monad-lop.js` script is the **main CLI script** that runs with 1inch Limit Order Protocol (LOP):

```bash
# Set environment variables
export PRIVATE_KEY=your_private_key
export SRC_CHAIN_RPC=your_arbitrum_sepolia_rpc
export DST_CHAIN_RPC=your_sepolia_rpc

# Run the main LOP cross-chain swap script
node scripts/arb-monad-lop.js
```

### Key Features

- **Direct 1inch LOP Integration**: Calls `fillOrderArgs` directly on LOP contracts
- **EIP-712 Typed Data Signing**: Proper order signing for LOP compatibility
- **Real HTLC Security**: Cryptographic secrets and hashlock validation
- **Complete Fusion+ Flow**: Order creation, escrow deployment, secret revelation
- **Comprehensive Testing**: Tests order with direct LOP contract calls
- **Inverted Direction**: Arbitrum Sepolia as source, Sepolia as destination

### Technical Implementation

#### LOP Order Creation
```javascript
// Create order using SDK's CrossChainOrder
const lopOrderParams = {
    salt: Sdk.randBigInt(1000n),
    maker: srcChain.user.address,
    makerAsset: config.chain.destination.tokens.USDC.address, // Arbitrum Sepolia USDC
    takerAsset: config.chain.source.tokens.USDC.address, // Sepolia USDC
    makingAmount: swapAmount,
    takingAmount: swapAmount, // 1:1 swap for simplicity
    orderFlags: 0n
}

const lopOrder = new Sdk.CrossChainOrderClass(
    srcChain.escrowFactoryContract.address,
    lopOrderParams,
    lopOrderParams.orderFlags
)
```

#### EIP-712 Typed Data Signing
```javascript
// Create typed data for EIP-712 signing
const typedData = {
    primaryType: 'Order',
    types: { EIP712Domain, Order },
    domain: {
        name: '1inch Limit Order Protocol',
        version: '4',
        chainId: config.chain.destination.chainId, // Arbitrum Sepolia chainId
        verifyingContract: config.chain.destination.limitOrderProtocol
    },
    message: {
        salt: orderForLOP.salt.toString(),
        maker: ethers.getAddress(ethers.zeroPadValue(ethers.toBeHex(orderForLOP.maker), 20)),
        receiver: ethers.getAddress(ethers.zeroPadValue(ethers.toBeHex(orderForLOP.receiver), 20)),
        makerAsset: ethers.getAddress(ethers.zeroPadValue(ethers.toBeHex(orderForLOP.makerAsset), 20)),
        takerAsset: ethers.getAddress(ethers.zeroPadValue(ethers.toBeHex(orderForLOP.takerAsset), 20)),
        makingAmount: orderForLOP.makingAmount.toString(),
        takingAmount: orderForLOP.takingAmount.toString(),
        makerTraits: orderForLOP.makerTraits.toString()
    }
}
```

#### Direct LOP Contract Call
```javascript
// Create LOP contract instance
const lopContract = new ethers.Contract(
    config.chain.destination.limitOrderProtocol,
    [
        'function fillOrderArgs(tuple(uint256 salt, uint256 maker, uint256 receiver, uint256 makerAsset, uint256 takerAsset, uint256 makingAmount, uint256 takingAmount, uint256 makerTraits) order, bytes32 r, bytes32 vs, uint256 amount, uint256 takerTraits, bytes args) external payable returns(uint256 makingAmount, uint256 takingAmount, bytes32 orderHash)'
    ],
    srcChain.user
)

// Call fillOrderArgs directly on LOP
const fillOrderTx = await lopContract.fillOrderArgs(
    orderForLOPCall,
    testR,
    testVs,
    swapAmount,
    testTakerTraits.trait,
    testTakerTraits.args,
    { value: 0n }
)
```

### Script Flow

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

### Network Configuration

- **Source Chain**: Arbitrum Sepolia (Chain ID: 421614)
- **Destination Chain**: Sepolia (Chain ID: 11155111)
- **LOP Addresses**: 
  - Arbitrum Sepolia: `0x98A320BF204385A4508A043493D41118c8463f13`
  - Sepolia: `0x0aa1A25F4AccAD28eF7069097f605149d4b5E025`
- **Token Addresses**: USDC on both chains with proper allowance management

### Security Features

- **Real HTLC Validation**: Cryptographic secret generation and validation
- **Time Restrictions**: Proper timelock implementation
- **Caller Validation**: Authorized user verification
- **Immutable Validation**: Complete parameter verification
- **Atomic Execution**: Either both operations succeed or both fail

---

**Note**: This script represents the primary implementation for cross-chain swaps with direct 1inch LOP integration, providing the most comprehensive testing and validation of the Fusion+ architecture.
