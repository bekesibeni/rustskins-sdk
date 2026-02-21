import { RustSkinsSDK } from '../src/index.js';
import { config } from 'dotenv';
config();
const API_KEY = process.env.API_KEY;
console.log('API_KEY:', API_KEY);
if (!API_KEY) {
  console.error('Missing API_KEY environment variable');
  process.exit(1);
}

const sdk = new RustSkinsSDK({
  apiKey: API_KEY,
});

async function testUser() {
  console.log('\n=== User Module ===');
  try {
    const user = await sdk.user.getUser();
    console.log('User:', JSON.stringify(user, null, 2));
  } catch (err: any) {
    console.error('getUser error:', err.message);
  }
}

async function testMarketplaceData() {
  console.log('\n=== Marketplace Module ===');
  try {
    const data = await sdk.marketplace.getMarketplaceData({ appId: 252490 });
    console.log(data);
  } catch (err: any) {
    console.error('getMarketplaceData error:', err.message);
  }
}

async function testMarketplace() {
  console.log('\n=== Marketplace Module ===');
  try {
    const data = await sdk.marketplace.getMarketplaceData();
    console.log(`Marketplace data: ${Array.isArray(data) ? data.length : 0} items`);
    if (Array.isArray(data) && data.length > 0) {
      console.log('First item:', JSON.stringify(data[0], null, 2));
    }
  } catch (err: any) {
    console.error('getMarketplaceData error:', err.message);
  }

  try {
    const items = await sdk.marketplace.searchItems({ take: 5 });
    console.log(`Search items: ${Array.isArray(items) ? items.length : 0} results`);
  } catch (err: any) {
    console.error('searchItems error:', err.message);
  }
}

async function testItems() {
  console.log('\n=== Items Module ===');
  try {
    const items = await sdk.items.searchItems({ take: 3, name: 'AK' });
    console.log(`Items search: ${Array.isArray(items) ? items.length : 0} results`);
    if (Array.isArray(items) && items.length > 0) {
      console.log('First item:', JSON.stringify(items[0], null, 2));
    }
  } catch (err: any) {
    console.error('searchItems error:', err.message);
  }
}

async function testInventory() {
  console.log('\n=== Inventory Module ===');
  try {
    const inv = await sdk.inventory.getInventory();
    console.log(`Inventory: ${Array.isArray(inv) ? inv.length : 0} items`);
  } catch (err: any) {
    console.error('getInventory error:', err.message);
  }
}

async function testListings() {
  console.log('\n=== Listings Module ===');
  try {
    const listings = await sdk.listings.getListings({ take: 5 });
    console.log(`Listings: ${Array.isArray(listings) ? listings.length : 0} items`);
  } catch (err: any) {
    console.error('getListings error:', err.message);
  }
}

async function testBuyOrders() {
  console.log('\n=== Buy Orders Module ===');
  try {
    const orders = await sdk.buyOrders.getBuyOrders({ take: 5 });
    console.log(`Buy orders: ${Array.isArray(orders) ? orders.length : 0} items`);
  } catch (err: any) {
    console.error('getBuyOrders error:', err.message);
  }
}

async function testPriceComparison() {
  console.log('\n=== Price Comparison Module ===');
  try {
    const prices = await sdk.priceComparison.getPriceComparison({ take: 3 });
    console.log(`Price comparison: ${Array.isArray(prices) ? prices.length : 0} items`);
    if (Array.isArray(prices) && prices.length > 0) {
      console.log('First item:', JSON.stringify(prices[0], null, 2));
    }
  } catch (err: any) {
    console.error('getPriceComparison error:', err.message);
  }
}

async function main() {
  console.log('RustSkins SDK Test Suite');
  console.log('========================');

  await testUser();
/*     await testMarketplaceData();
await testMarketplace();
  await testItems();
  await testInventory();
  await testListings();
  await testBuyOrders();
  await testPriceComparison(); */

  console.log('\n========================');
  console.log('Tests complete.');
  sdk.destroy();
}

main().catch(console.error);
