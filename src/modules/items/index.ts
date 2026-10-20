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
  PriceLimit,
} from './types.js';

export function initItemsModule(client: RustSkinsClient) {
  return {
    async searchItems(params?: SearchItemsParams): Promise<SteamItemType[]> {
      return client.get('external/items', {
        name: params?.name,
        appId: params?.appId,
        page: params?.page,
        take: params?.take,
      });
    },

    async getItemBuyOrders(params: GetItemBuyOrdersParams): Promise<ItemBuyOrder[]> {
      return client.get(`external/items/${params.id}/buy-orders`, { page: params.page, take: params.take });
    },

    async getItemListings(params: GetItemListingsParams): Promise<ItemListing[]> {
      return client.get(`external/items/${params.id}/listings`, { page: params.page, take: params.take });
    },

    async getItemRecentSales(params: GetItemRecentSalesParams): Promise<ItemRecentSale[]> {
      return client.get(`external/items/${params.id}/recent-sales`, { page: params.page, take: params.take });
    },

    async getPriceLimits(appId = 252490): Promise<PriceLimit[]> {
      return client.get(`external/item-types/price-limits/${appId}`);
    },
  };
}

export * from './types.js';
