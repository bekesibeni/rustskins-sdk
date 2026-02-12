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
      return client.get('external/instant-sale/prices', params);
    },

    async getSteamInventory(): Promise<InstantSaleInventory> {
      return client.get('external/instant-sale/steam');
    },

    async instantSellSteam(params: InstantSellSteamParams): Promise<any> {
      return client.post('external/instant-sale/steam', params as unknown as Record<string, any>);
    },

    async instantSellInventory(params: InventoryInstantSellParams): Promise<InstantSaleItem[]> {
      return client.post('external/instant-sale/inventory/v2', params as unknown as Record<string, any>);
    },

    async instantSellListings(params: MarketInstantSellListingsParams): Promise<InstantSaleItem[]> {
      return client.post('external/instant-sale/listings/v2', params as unknown as Record<string, any>);
    },
  };
}

export * from './types.js';
