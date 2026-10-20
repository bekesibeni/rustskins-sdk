import type { RustSkinsClient } from '../../core/client.js';
import type {
  GetMarketplaceDataParams,
  GetMarketplaceDataV2QueryParams,
  SearchMarketplaceParams,
  GetSalesParams,
  GetPurchasesParams,
  BuyMarketplaceItemsParams,
  ResellMarketplaceItemsParams,
  MarketplaceDataItem,
  MarketplaceDataV2Item,
  MarketplaceItem,
  MarketplaceTransaction,
} from './types.js';

export function initMarketplaceModule(client: RustSkinsClient) {
  return {
    async getMarketplaceData(params?: GetMarketplaceDataParams): Promise<MarketplaceDataItem[]> {
      const appId = params?.appId ?? 252490;
      return client.get(`external/marketplace/data/${appId}`);
    },

    async getMarketplaceDataV2(params?: GetMarketplaceDataV2QueryParams): Promise<MarketplaceDataV2Item[]> {
      return client.get('external/marketplace/data/v2', { appId: params?.appId });
    },

    async getTf2MarketplaceData(): Promise<MarketplaceDataItem[]> {
      return client.get('external/marketplace/tf2-data');
    },

    async searchItems(params?: SearchMarketplaceParams): Promise<MarketplaceItem[]> {
      return client.get('external/marketplace/items', {
        name: params?.name,
        order: params?.order,
        appId: params?.appId,
        page: params?.page,
        take: params?.take,
      });
    },

    async getSales(params?: GetSalesParams): Promise<MarketplaceTransaction[]> {
      return client.get('external/marketplace/sales', { page: params?.page, take: params?.take });
    },

    async getPurchases(params?: GetPurchasesParams): Promise<MarketplaceTransaction[]> {
      return client.get('external/marketplace/purchases', { page: params?.page, take: params?.take });
    },

    async purchase(params: BuyMarketplaceItemsParams): Promise<any> {
      return client.post('external/marketplace/purchase', { items: params.items });
    },

    async resell(params: ResellMarketplaceItemsParams): Promise<any> {
      return client.post('external/marketplace/resell', { items: params.items, tradeUrl: params.tradeUrl });
    },
  };
}

export * from './types.js';
