import { RustSkinsSDK } from '../src/index.js';
import { config } from 'dotenv';

config();

const API_KEY = process.env.API_KEY;
const PROJECT_ID = process.env.PROJECT_ID ? parseInt(process.env.PROJECT_ID, 10) : undefined;

if (!API_KEY) {
  console.error('Missing API_KEY environment variable');
  process.exit(1);
}

const sdk = new RustSkinsSDK({
  apiKey: API_KEY,
  projectId: PROJECT_ID,
});

async function testPartnerMarketplace() {
  console.log('\n=== Partner Marketplace ===');
  try {
    const data = await sdk.partner.getMarketplaceData({ appId: 252490 });
    console.log(`Marketplace data v2: ${Array.isArray(data) ? data.length : 0} items`);
    if (Array.isArray(data) && data.length > 0) {
      console.log('First item:', JSON.stringify(data[0], null, 2));
    }
  } catch (err: any) {
    console.error('getMarketplaceData error:', err.message);
  }
}

async function testPartnerSellData() {
  console.log('\n=== Partner Sell Data ===');
  try {
    const data = await sdk.partner.getSellData({ appId: 252490 });
    console.log(`Sell data: ${Array.isArray(data) ? data.length : 0} items`);
    if (Array.isArray(data) && data.length > 0) {
      console.log('First item:', JSON.stringify(data[0], null, 2));
    }
  } catch (err: any) {
    console.error('getSellData error:', err.message);
  }
}

async function main() {
  console.log('RustSkins Partner API Test Suite');
  console.log('=================================');

  await testPartnerMarketplace();
  await testPartnerSellData();

  console.log('\n=================================');
  console.log('Tests complete.');
  sdk.destroy();
}

main().catch(console.error);
