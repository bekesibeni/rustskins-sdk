# RustSkins SDK

A production-ready TypeScript SDK for the RustSkins API with full type safety, keep-alive sessions, and proxy support.

## Installation

```bash
npm install rustskins-sdk
```

## Features

- ✅ **Full TypeScript support** - Every endpoint fully typed
- ✅ **Keep-alive sessions** - Optimized connection pooling
- ✅ **Proxy support** - SOCKS5, HTTP, HTTPS with auto-detection
- ✅ **45 endpoints** across 9 modules
- ✅ **Bearer token authentication**
- ✅ **ESM-only** - Modern, tree-shakeable
- ✅ **Node 20+** required

## Quick Start

```typescript
import { RustSkinsSDK } from 'rustskins-sdk';

const sdk = new RustSkinsSDK({
  apiKey: 'your-api-key',
  projectId: 10, // Optional, for partner endpoints
  proxy: 'socks5://user:pass@host:port', // Optional
});

// Get user info
const user = await sdk.user.getUser();

// Search marketplace
const items = await sdk.marketplace.searchItems({ take: 10 });

// Get inventory
const inventory = await sdk.inventory.getInventory();

// Clean up when done
sdk.destroy();
```

## Modules

### User Module

```typescript
await sdk.user.getUser();
await sdk.user.updateUser({ email: 'new@email.com' });
await sdk.user.getTrades({ page: 1, take: 50 });
await sdk.user.getReferrals({ page: 1 });
await sdk.user.checkReferral({ steamId: '76561197960287930' });
```

### Marketplace Module

```typescript
await sdk.marketplace.getMarketplaceData({ appId: 252490 });
await sdk.marketplace.getTf2MarketplaceData();
await sdk.marketplace.searchItems({ name: 'AK', take: 10 });
await sdk.marketplace.getSales({ page: 1 });
await sdk.marketplace.getPurchases({ page: 1 });
await sdk.marketplace.purchase({ items: [{ id: 123, amount: 1, price: 10.99 }] });
await sdk.marketplace.resell({ items: [...], tradeUrl: '...' });
```

### Inventory Module

```typescript
await sdk.inventory.getInventory();
await sdk.inventory.getSteamInventory();
await sdk.inventory.sellSteamItems({ items: [...] });
await sdk.inventory.sellItems({ items: [...] });
await sdk.inventory.withdrawItems({ items: [...] });
```

### Listings Module

```typescript
await sdk.listings.getListings({ page: 1, take: 50 });
await sdk.listings.updateListings({ listings: [...] });
await sdk.listings.delistListings({ listings: [...] });
await sdk.listings.updatePricingStrategy({ listings: [...] });
```

### Buy Orders Module

```typescript
await sdk.buyOrders.getBuyOrdersData({ appId: 252490 });
await sdk.buyOrders.getBuyOrders({ page: 1 });
await sdk.buyOrders.createBuyOrders({ items: [...] });
await sdk.buyOrders.updateBuyOrders({ orders: [...] });
await sdk.buyOrders.cancelBuyOrders({ orders: [...] });
await sdk.buyOrders.cancelAllBuyOrders();
```

### Items Module

```typescript
await sdk.items.searchItems({ name: 'AK', take: 10 });
await sdk.items.getItemBuyOrders({ id: 123, page: 1 });
await sdk.items.getItemListings({ id: 123, page: 1 });
await sdk.items.getItemRecentSales({ id: 123, page: 1 });
```

### Instant Sale Module

```typescript
await sdk.instantSale.getPrices({ name: 'AK', take: 10 });
await sdk.instantSale.getSteamInventory();
await sdk.instantSale.instantSellSteam({ items: [...], type: 'balance' });
await sdk.instantSale.instantSellInventory({ items: [...] });
await sdk.instantSale.instantSellListings({ listings: [...] });
```

### Price Comparison Module

```typescript
await sdk.priceComparison.getPriceComparison({ name: 'AK', take: 10 });
```

### Partner Module

```typescript
// Requires projectId in SDK constructor or method call
await sdk.partner.getMarketplaceData({ appId: 252490 });
await sdk.partner.getSellData({ appId: 252490 });
await sdk.partner.getSteamInventory({ steamId: '...' });
await sdk.partner.purchaseAndWithdraw({ items: [...], tradeUrl: '...', orderId: '...' });
await sdk.partner.sellItems({ items: [...], tradeUrl: '...' });
await sdk.partner.getTrade({ id: 123 });
await sdk.partner.getTradeByOrder({ id: 'order-123' });
await sdk.partner.getTradesByTradeUrl({ tradeUrl: '...' });
```

## Proxy Support

The SDK supports three proxy types with automatic protocol detection:

```typescript
// SOCKS5 (default if no protocol specified)
new RustSkinsSDK({
  apiKey: '...',
  proxy: 'socks5://user:pass@host:port'
});

// HTTP
new RustSkinsSDK({
  apiKey: '...',
  proxy: 'http://user:pass@host:port'
});

// HTTPS
new RustSkinsSDK({
  apiKey: '...',
  proxy: 'https://user:pass@host:port'
});
```

## Error Handling

```typescript
try {
  const user = await sdk.user.getUser();
} catch (error) {
  console.error('API Error:', error.message);
}
```

## Environment Variables

```env
API_KEY=your-api-key
PROJECT_ID=10
```

## License

MIT
