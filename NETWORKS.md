# Network Configuration - Unite DeFi Cross-Chain Swap

This document provides a comprehensive list of all supported networks and their configuration details for the Unite DeFi cross-chain swap platform.

## 🌐 Supported Networks

### Primary Networks

#### 1. Sepolia (Source Chain)
- **Chain ID**: 11155111
- **Network Name**: Sepolia Testnet
- **Currency**: ETH
- **RPC URLs**:
  - Alchemy: `https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY`
  - Infura: `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`
  - Public: `https://eth-sepolia.public.blastapi.io`
- **Block Explorer**: https://sepolia.etherscan.io
- **Status**: ✅ Active (Source Chain)

**Contract Addresses**:
- **Limit Order Protocol**: `0x0aa1A25F4AccAD28eF7069097f605149d4b5E025`
- **WETH**: `0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14`
- **USDC**: `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`

#### 2. Arbitrum Sepolia (Primary Destination)
- **Chain ID**: 421614
- **Network Name**: Arbitrum Sepolia
- **Currency**: ETH
- **RPC URLs**:
  - Alchemy: `https://arb-sepolia.g.alchemy.com/v2/YOUR_API_KEY`
  - Infura: `https://arbitrum-sepolia.infura.io/v3/YOUR_PROJECT_ID`
  - Public: `https://arbitrum-sepolia.public.blastapi.io`
- **Block Explorer**: https://sepolia.arbiscan.io
- **Status**: ✅ Active (Primary Destination)

**Contract Addresses**:
- **Limit Order Protocol**: `0x98A320BF204385A4508A043493D41118c8463f13`
- **WETH**: `0x980B62Da83eFf3D4576C647993b0c1D7faf17c73`
- **USDC**: `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d`

### Alternative Destination Networks

#### 3. Monad Testnet
- **Chain ID**: 10143
- **Network Name**: Monad Testnet
- **Currency**: MON
- **RPC URLs**:
  - Official: `https://rpc.testnet.monad.xyz`
  - Alternative: `https://monad-testnet.rpc.thirdweb.com`
- **Block Explorer**: https://explorer.testnet.monad.xyz
- **Status**: ✅ Active (Alternative Destination)

**Contract Addresses**:
- **Limit Order Protocol**: `0x4aA294c0B461B454188053a7F055be5807f212B4`
- **WETH**: `0xDA4b0cF402292e44D076ad6b461213c27ff4d1E6`
- **USDC**: `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d`

#### 4. Etherlink Testnet
- **Chain ID**: 128123
- **Network Name**: Etherlink Testnet
- **Currency**: XTZ
- **RPC URLs**:
  - Official: `https://node.ghostnet.etherlink.com`
  - Alternative: `https://testnet.etherlink.com`
- **Block Explorer**: https://testnet.explorer.etherlink.com
- **Status**: ⚠️ Limited (Mock LOP)

**Contract Addresses**:
- **Limit Order Protocol**: `0x0D0Be0B15F2ba435146FF9bf3397e26D3ffCCc81` (Mock)
- **WETH**: `0x4aA294c0B461B454188053a7F055be5807f212B4`
- **USDC**: `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d`

## 🔧 Network Configuration for Frontend

### Direct Cross-Chain Swap Support

The platform supports direct cross-chain swaps between Arbitrum Sepolia and Monad Testnet using the standalone script:

```bash
# Arbitrum Sepolia ↔ Monad Testnet swaps
node scripts/cross-chain-swap-real.js
```

**Supported Swap Directions:**
- **Arbitrum Sepolia → Monad Testnet**: USDC swaps with real HTLC validation
- **Monad Testnet → Arbitrum Sepolia**: USDC swaps with real HTLC validation

**Key Features:**
- Real cryptographic secret generation and validation
- Complete 1inch Fusion+ order flow
- Direct escrow contract deployment
- Atomic swap execution
- Comprehensive transaction tracking

### Main LOP Script (arb-monad-lop.js)

**Primary CLI script** with direct 1inch Limit Order Protocol integration:

```bash
# Arbitrum Sepolia ↔ Sepolia swaps with LOP
node scripts/arb-monad-lop.js
```

**Supported Swap Directions:**
- **Arbitrum Sepolia → Sepolia**: USDC swaps with direct LOP integration
- **Inverted Direction**: Arbitrum Sepolia as source, Sepolia as destination

**Key Features:**
- **Direct LOP Integration**: Calls `fillOrderArgs` directly on LOP contracts
- **EIP-712 Typed Data Signing**: Proper order signing for LOP compatibility
- **Real HTLC Security**: Cryptographic secrets and hashlock validation
- **Complete Fusion+ Flow**: Order creation, escrow deployment, secret revelation
- **Comprehensive Testing**: Tests orders with direct LOP contract calls

### MetaMask Network Configuration

```javascript
const NETWORKS = {
  sepolia: {
    chainId: '0xaa36a7', // 11155111
    chainName: 'Sepolia Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY'],
    blockExplorerUrls: ['https://sepolia.etherscan.io']
  },
  arbitrumSepolia: {
    chainId: '0x66eee', // 421614
    chainName: 'Arbitrum Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://arb-sepolia.g.alchemy.com/v2/YOUR_API_KEY'],
    blockExplorerUrls: ['https://sepolia.arbiscan.io']
  },
  monad: {
    chainId: '0x2797', // 10143
    chainName: 'Monad Testnet',
    nativeCurrency: {
      name: 'MON',
      symbol: 'MON',
      decimals: 18
    },
    rpcUrls: ['https://rpc.testnet.monad.xyz'],
    blockExplorerUrls: ['https://explorer.testnet.monad.xyz']
  },
  etherlink: {
    chainId: '0x1f47b', // 128123
    chainName: 'Etherlink Testnet',
    nativeCurrency: {
      name: 'Tezos',
      symbol: 'XTZ',
      decimals: 18
    },
    rpcUrls: ['https://node.ghostnet.etherlink.com'],
    blockExplorerUrls: ['https://testnet.explorer.etherlink.com']
  }
};
```

### Network Selection Configuration

```javascript
const NETWORK_CONFIG = {
  // Source networks (where users can initiate swaps)
  sourceNetworks: [
    {
      id: 'sepolia',
      name: 'Sepolia',
      chainId: 11155111,
      isActive: true,
      isDefault: true
    }
  ],
  
  // Destination networks (where users receive tokens)
  destinationNetworks: [
    {
      id: 'arbitrumSepolia',
      name: 'Arbitrum Sepolia',
      chainId: 421614,
      isActive: true,
      isDefault: true,
      priority: 1
    },
    {
      id: 'monad',
      name: 'Monad Testnet',
      chainId: 10143,
      isActive: true,
      isDefault: false,
      priority: 2
    },
    {
      id: 'etherlink',
      name: 'Etherlink Testnet',
      chainId: 128123,
      isActive: false, // Limited due to mock LOP
      isDefault: false,
      priority: 3
    }
  ]
};
```

## 📊 Network Status and Capabilities

### Network Comparison

| Network | Chain ID | Status | LOP Deployed | Gas Fees | Speed | Reliability |
|---------|----------|--------|--------------|----------|-------|-------------|
| Sepolia | 11155111 | ✅ Active | ✅ Yes | Low | Fast | High |
| Arbitrum Sepolia | 421614 | ✅ Active | ✅ Yes | Very Low | Very Fast | High |
| Monad Testnet | 10143 | ✅ Active | ✅ Yes | Low | Fast | Medium |
| Etherlink Testnet | 128123 | ⚠️ Limited | ❌ Mock | Low | Fast | Low |

### Gas Fee Estimates

| Network | Simple Transfer | Contract Deployment | Complex Swap |
|---------|----------------|-------------------|--------------|
| Sepolia | ~0.001 ETH | ~0.01 ETH | ~0.005 ETH |
| Arbitrum Sepolia | ~0.0001 ETH | ~0.001 ETH | ~0.0005 ETH |
| Monad Testnet | ~0.0001 MON | ~0.001 MON | ~0.0005 MON |
| Etherlink Testnet | ~0.0001 XTZ | ~0.001 XTZ | ~0.0005 XTZ |

## 🔗 Network-Specific Features

### Sepolia
- **Pros**: Stable, well-tested, good documentation
- **Cons**: Higher gas fees, slower finality
- **Best for**: Testing, development, small amounts

### Arbitrum Sepolia
- **Pros**: Very low gas fees, fast finality, L2 scaling
- **Cons**: Requires bridge for mainnet
- **Best for**: Production testing, cost-effective swaps
- **Cross-Chain**: Supports direct swaps with Monad via `cross-chain-swap-real.js`

### Monad Testnet
- **Pros**: Parallel execution, high throughput
- **Cons**: Newer network, limited tooling
- **Best for**: High-volume testing, parallel processing
- **Cross-Chain**: Supports direct swaps with Arbitrum Sepolia via `cross-chain-swap-real.js`

### Etherlink Testnet
- **Pros**: Tezos-based, low fees
- **Cons**: Limited LOP support, mock contracts
- **Best for**: Experimental testing only

## 🛠️ Network Integration

### Adding a New Network

To add a new network to the system:

1. **Update Configuration Files**:
   ```javascript
   // Add to tests/config.js
   newNetwork: {
     chainId: 12345,
     limitOrderProtocol: '0x...',
     wrappedNative: '0x...',
     tokens: {
       WETH: { address: '0x...' },
       USDC: { address: '0x...' }
     }
   }
   ```

2. **Deploy Contracts**:
   - Deploy Limit Order Protocol
   - Deploy WETH contract
   - Verify contracts on block explorer

3. **Update Documentation**:
   - Add network details to NETWORKS.md
   - Update README.md with new addresses
   - Update API.md with new configuration

4. **Test Integration**:
   - Run cross-chain swap tests
   - Verify contract interactions
   - Test frontend integration

### Network Maintenance

#### Regular Tasks
- Monitor network status and uptime
- Check gas fee trends
- Verify contract functionality
- Update RPC endpoints if needed

#### Emergency Procedures
- Network downtime: Switch to alternative destination
- Contract issues: Pause swaps, investigate, redeploy if needed
- Gas fee spikes: Implement dynamic fee adjustment

## 📈 Network Analytics

### Key Metrics to Monitor

1. **Transaction Success Rate**: Percentage of successful swaps
2. **Average Gas Fees**: Cost per transaction
3. **Block Time**: Network performance
4. **Contract Calls**: Usage statistics
5. **Error Rates**: Network reliability

### Monitoring Tools

- **Block Explorers**: Transaction tracking
- **RPC Providers**: Network health
- **Custom Analytics**: Swap success rates
- **Alert Systems**: Network issues

## 🔒 Security Considerations

### Network-Specific Security

1. **Sepolia**: Standard Ethereum security
2. **Arbitrum Sepolia**: L2 security with fraud proofs
3. **Monad Testnet**: Parallel execution security
4. **Etherlink Testnet**: Tezos-based security

### Best Practices

- Always verify contract addresses before deployment
- Test thoroughly on testnets before mainnet
- Monitor for network-specific vulnerabilities
- Implement proper error handling for each network

---

**Note**: This network configuration is current as of the latest deployment. Always verify contract addresses and network status before use. 