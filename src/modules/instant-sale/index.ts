import type { RustSkinsClient } from '../../core/client.js';
import type {
  GetInstantSalePricesParams,
  InstantSellSteamParams,
  InventoryInstantSellParams,
  MarketInstantSellListingsParams,
  InstantSalePriceItem,
  InstantSaleInventory,
  InstantSaleItem,
} from './types.js';

export function initInstantSaleModule(client: RustSkinsClient) {
  return {
    async getPrices(params?: GetInstantSalePricesParams): Promise<InstantSalePriceItem[]> {
      return client.get('external/instant-sale/prices', {
        name: params?.name,
        appId: params?.appId,
        page: params?.page,
        take: params?.take,
      });
    },

    async getSteamInventory(): Promise<InstantSaleInventory> {
      return client.get('external/instant-sale/steam');
    },

    async instantSellSteam(params: InstantSellSteamParams): Promise<any> {
      return client.post('external/instant-sale/steam', { ...params });
    },

    async instantSellInventory(params: InventoryInstantSellParams): Promise<InstantSaleItem[]> {
      return client.post('external/instant-sale/inventory/v2', { items: params.items });
    },

    async instantSellListings(params: MarketInstantSellListingsParams): Promise<InstantSaleItem[]> {
      return client.post('external/instant-sale/listings/v2', { listings: params.listings });
    },
  };
}

export * from './types.js';
