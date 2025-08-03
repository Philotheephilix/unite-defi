# API Documentation - Unite DeFi Backend Relayer

This document provides comprehensive API documentation for the Unite DeFi cross-chain swap backend relayer service.

## 🚀 Base URL

```
http://localhost:3001
```

## 📋 Overview

The backend relayer provides a REST API for:
- Contract deployment on both chains
- Cross-chain swap order creation
- Swap execution with user signatures
- Real-time status tracking
- Balance and allowance checking

## 🔐 Authentication

Currently, the API uses a simple private key-based authentication system. The relayer wallet private key is configured via environment variables.

**Note**: For production, implement proper authentication mechanisms.

## 📡 API Endpoints

### Health Check

#### GET /health
Check if the relayer service is running.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-27T10:30:00.000Z",
  "version": "1.0.0"
}
```

### Contract Deployment

#### POST /api/deploy-factories
Deploy EscrowFactory contracts on both source and destination chains.

**Request Body:**
```json
{
  "userAddress": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "srcChain": {
      "chainId": 11155111,
      "factoryAddress": "0x...",
      "resolverAddress": "0x...",
      "transactionHash": "0x..."
    },
    "dstChain": {
      "chainId": 10143,
      "factoryAddress": "0x...",
      "resolverAddress": "0x...",
      "transactionHash": "0x..."
    }
  },
  "message": "Contracts deployed successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Insufficient funds for deployment",
  "code": "INSUFFICIENT_FUNDS"
}
```

### Order Creation

#### POST /api/create-order
Create a new cross-chain swap order.

**Request Body:**
```json
{
  "userAddress": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "amount": "1000000",
  "srcChainId": 11155111,
  "dstChainId": 10143,
  "srcToken": "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  "dstToken": "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "uuid-1234-5678-90ab",
    "order": {
      "maker": "0x...",
      "taker": "0x...",
      "makerAsset": "0x...",
      "takerAsset": "0x...",
      "makerAmount": "1000000",
      "takerAmount": "1000000",
      "expiration": 1735689600
    },
    "hashlock": "0x...",
    "secret": "0x...",
    "srcImmutables": {
      "orderHash": "0x...",
      "hashlock": "0x...",
      "maker": "0x...",
      "taker": "0x...",
      "token": "0x...",
      "amount": "1000000",
      "safetyDeposit": "1000000000000000000",
      "timelocks": {
        "deployedAt": 0,
        "cancellation": 0,
        "withdrawal": 0
      }
    },
    "dstImmutables": {
      "orderHash": "0x...",
      "hashlock": "0x...",
      "maker": "0x...",
      "taker": "0x...",
      "token": "0x...",
      "amount": "1000000",
      "safetyDeposit": "1000000000000000000",
      "timelocks": {
        "deployedAt": 0,
        "cancellation": 0,
        "withdrawal": 0
      }
    }
  },
  "message": "Order created successfully"
}
```

### Swap Execution

#### POST /api/execute-swap
Execute a cross-chain swap with user signature.

**Request Body:**
```json
{
  "orderId": "uuid-1234-5678-90ab",
  "signature": "0x...",
  "userAddress": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "uuid-1234-5678-90ab",
    "status": "executing",
    "transactions": {
      "srcDeploy": "0x...",
      "srcSwap": "0x...",
      "dstDeploy": "0x...",
      "dstSwap": "0x..."
    },
    "estimatedTime": "2-5 minutes"
  },
  "message": "Swap execution started"
}
```

### Status Tracking

#### GET /api/swap-status/:orderId
Get the current status of a swap order.

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "uuid-1234-5678-90ab",
    "status": "completed",
    "progress": {
      "srcDeploy": "completed",
      "srcSwap": "completed",
      "dstDeploy": "completed",
      "dstSwap": "completed"
    },
    "transactions": {
      "srcDeploy": {
        "hash": "0x...",
        "status": "confirmed",
        "blockNumber": 12345678
      },
      "srcSwap": {
        "hash": "0x...",
        "status": "confirmed",
        "blockNumber": 12345679
      },
      "dstDeploy": {
        "hash": "0x...",
        "status": "confirmed",
        "blockNumber": 123456
      },
      "dstSwap": {
        "hash": "0x...",
        "status": "confirmed",
        "blockNumber": 123457
      }
    },
    "timestamps": {
      "created": "2025-01-27T10:30:00.000Z",
      "started": "2025-01-27T10:30:05.000Z",
      "completed": "2025-01-27T10:32:15.000Z"
    }
  }
}
```

### Balance and Allowance

#### GET /api/balances/:userAddress
Get token balances and allowances for a user.

**Response:**
```json
{
  "success": true,
  "data": {
    "srcChain": {
      "chainId": 11155111,
      "native": "1000000000000000000",
      "tokens": {
        "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238": {
          "symbol": "USDC",
          "balance": "1000000",
          "allowance": "0",
          "decimals": 6
        }
      }
    },
    "dstChain": {
      "chainId": 10143,
      "native": "500000000000000000",
      "tokens": {
        "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d": {
          "symbol": "USDC",
          "balance": "0",
          "allowance": "0",
          "decimals": 6
        }
      }
    }
  }
}
```

### Token Approval

#### POST /api/approve-token
Approve token spending for the relayer.

**Request Body:**
```json
{
  "userAddress": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "tokenAddress": "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  "chainId": 11155111,
  "amount": "1000000"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionHash": "0x...",
    "status": "pending",
    "gasUsed": "50000",
    "gasPrice": "20000000000"
  },
  "message": "Token approval transaction submitted"
}
```

## 🔄 Status Codes

### Swap Status Values

| Status | Description |
|--------|-------------|
| `pending` | Order created, waiting for signature |
| `executing` | Swap execution in progress |
| `src_deploying` | Deploying source escrow |
| `src_swapping` | Executing source chain swap |
| `dst_deploying` | Deploying destination escrow |
| `dst_swapping` | Executing destination chain swap |
| `completed` | Swap completed successfully |
| `failed` | Swap failed |
| `cancelled` | Swap cancelled by user |
| `expired` | Swap expired |

### Transaction Status Values

| Status | Description |
|--------|-------------|
| `pending` | Transaction submitted to mempool |
| `confirmed` | Transaction confirmed on blockchain |
| `failed` | Transaction failed |
| `reverted` | Transaction reverted |

## 🚨 Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INSUFFICIENT_FUNDS` | User doesn't have enough tokens | 400 |
| `INSUFFICIENT_ALLOWANCE` | Token approval required | 400 |
| `INVALID_SIGNATURE` | Signature verification failed | 400 |
| `ORDER_NOT_FOUND` | Order ID not found | 404 |
| `ORDER_EXPIRED` | Order has expired | 400 |
| `ORDER_ALREADY_EXECUTED` | Order already executed | 400 |
| `CONTRACT_NOT_DEPLOYED` | Contracts not deployed | 400 |
| `RPC_ERROR` | Blockchain RPC error | 500 |
| `INTERNAL_ERROR` | Internal server error | 500 |

## 📊 Rate Limiting

Currently, the API doesn't implement rate limiting. For production deployment, consider implementing:

- Request rate limiting per IP
- User-based rate limiting
- Endpoint-specific limits

## 🔒 Security Considerations

### Input Validation
- All addresses are validated for proper format
- Amounts are validated for positive values
- Signatures are verified cryptographically
- Order expiration is checked

### Error Handling
- Sensitive information is not exposed in error messages
- Detailed logs are kept for debugging
- Graceful degradation on failures

## 📝 Example Usage

### Complete Swap Flow

```javascript
// 1. Deploy contracts
const deployResponse = await fetch('/api/deploy-factories', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userAddress: '0x...' })
});

// 2. Create order
const orderResponse = await fetch('/api/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userAddress: '0x...',
    amount: '1000000',
    srcChainId: 11155111,
    dstChainId: 10143
  })
});

const { orderId, order } = await orderResponse.json();

// 3. Sign order (frontend)
const signature = await signOrder(order);

// 4. Execute swap
const executeResponse = await fetch('/api/execute-swap', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    orderId,
    signature,
    userAddress: '0x...'
  })
});

// 5. Monitor progress
const statusResponse = await fetch(`/api/swap-status/${orderId}`);
const status = await statusResponse.json();
```

### Error Handling

```javascript
try {
  const response = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  
  const result = await response.json();
  
  if (!result.success) {
    switch (result.code) {
      case 'INSUFFICIENT_FUNDS':
        console.error('Insufficient token balance');
        break;
      case 'INSUFFICIENT_ALLOWANCE':
        console.error('Token approval required');
        break;
      default:
        console.error('Unknown error:', result.error);
    }
  }
} catch (error) {
  console.error('Network error:', error);
}
```

## 🔧 Configuration

### Environment Variables

The relayer service uses the following environment variables:

```bash
# Required
PRIVATE_KEY=your_private_key
SRC_CHAIN_RPC=your_sepolia_rpc
DST_CHAIN_RPC=your_monad_rpc

# Optional
PORT=3001
DEBUG=false
LOG_LEVEL=info
```

### Network Configuration

The service supports multiple networks through configuration:

```javascript
const networks = {
  11155111: { // Sepolia
    name: 'Sepolia',
    rpc: process.env.SRC_CHAIN_RPC,
    chainId: 11155111,
    tokens: {
      WETH: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
      USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'
    },
    limitOrderProtocol: '0x0aa1A25F4AccAD28eF7069097f605149d4b5E025'
  },
  421614: { // Arbitrum Sepolia
    name: 'Arbitrum Sepolia',
    rpc: process.env.DST_CHAIN_RPC,
    chainId: 421614,
    tokens: {
      WETH: '0x980B62Da83eFf3D4576C647993b0c1D7faf17c73',
      USDC: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'
    },
    limitOrderProtocol: '0x98A320BF204385A4508A043493D41118c8463f13'
  },
  10143: { // Monad Testnet
    name: 'Monad Testnet',
    rpc: 'https://rpc.testnet.monad.xyz',
    chainId: 10143,
    tokens: {
      WETH: '0xDA4b0cF402292e44D076ad6b461213c27ff4d1E6',
      USDC: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'
    },
    limitOrderProtocol: '0x4aA294c0B461B454188053a7F055be5807f212B4'
  },
  128123: { // Etherlink Testnet
    name: 'Etherlink Testnet',
    rpc: 'https://node.ghostnet.etherlink.com',
    chainId: 128123,
    tokens: {
      WETH: '0x4aA294c0B461B454188053a7F055be5807f212B4',
      USDC: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'
    },
    limitOrderProtocol: '0x0D0Be0B15F2ba435146FF9bf3397e26D3ffCCc81'
  }
};
```

## 📈 Monitoring

### Health Checks
- `/health` endpoint for basic health monitoring
- Database connectivity checks
- RPC endpoint availability checks

### Metrics
Consider implementing metrics for:
- Request count per endpoint
- Response times
- Error rates
- Swap success rates
- Gas usage statistics

### Logging
The service logs:
- API requests and responses
- Transaction submissions and confirmations
- Error conditions
- Performance metrics

---

**Note**: This API documentation is for the current development version. Production deployments may have additional security measures and rate limiting. 