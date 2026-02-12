import type { RustSkinsClient } from '../../core/client.js';
import type {
  SearchItemsParams,
  GetItemBuyOrdersParams,
  GetItemListingsParams,
  GetItemRecentSalesParams,
  SteamItemType,
  ItemBuyOrder,
  ItemListing,
  ItemRecentSale,
} from './types.js';

export function initItemsModule(client: RustSkinsClient) {
  return {
    async searchItems(params?: SearchItemsParams): Promise<SteamItemType[]> {
      return client.get('external/items', params);
    },

    async getItemBuyOrders(params: GetItemBuyOrdersParams): Promise<ItemBuyOrder[]> {
      const { id, ...query } = params;
      return client.get(`external/items/${id}/buy-orders`, query);
    },

    async getItemListings(params: GetItemListingsParams): Promise<ItemListing[]> {
      const { id, ...query } = params;
      return client.get(`external/items/${id}/listings`, query);
    },

    async getItemRecentSales(params: GetItemRecentSalesParams): Promise<ItemRecentSale[]> {
      const { id, ...query } = params;
      return client.get(`external/items/${id}/recent-sales`, query);
    },
  };
}

export * from './types.js';
