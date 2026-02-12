import type { RustSkinsClient } from '../../core/client.js';
import type {
  GetMarketplaceDataParams,
  SearchMarketplaceParams,
  GetSalesParams,
  GetPurchasesParams,
  BuyMarketplaceItemsParams,
  ResellMarketplaceItemsParams,
  MarketplaceDataItem,
  MarketplaceItem,
  MarketplaceTransaction,
} from './types.js';

export function initMarketplaceModule(client: RustSkinsClient) {
  return {
    async getMarketplaceData(params?: GetMarketplaceDataParams): Promise<MarketplaceDataItem[]> {
      const appId = params?.appId ?? 252490;
      return client.get(`external/marketplace/data/${appId}`);
    },

    async getTf2MarketplaceData(): Promise<MarketplaceDataItem[]> {
      return client.get('external/marketplace/tf2-data');
    },

    async searchItems(params?: SearchMarketplaceParams): Promise<MarketplaceItem[]> {
      return client.get('external/marketplace/items', params);
    },

    async getSales(params?: GetSalesParams): Promise<MarketplaceTransaction[]> {
      return client.get('external/marketplace/sales', params);
    },

    async getPurchases(params?: GetPurchasesParams): Promise<MarketplaceTransaction[]> {
      return client.get('external/marketplace/purchases', params);
    },

    async purchase(params: BuyMarketplaceItemsParams): Promise<any> {
      return client.post('external/marketplace/purchase', params as unknown as Record<string, any>);
    },

    async resell(params: ResellMarketplaceItemsParams): Promise<any> {
      return client.post('external/marketplace/resell', params as unknown as Record<string, any>);
    },
  };
}

export * from './types.js';
