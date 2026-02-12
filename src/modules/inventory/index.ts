import type { RustSkinsClient } from '../../core/client.js';
import type {
  GroupedInventoryItem,
  SteamInventoryItemV2,
  SellSteamItemsParams,
  ListGroupedItemsParams,
  WithdrawGroupedItemsParams,
} from './types.js';

export function initInventoryModule(client: RustSkinsClient) {
  return {
    async getInventory(): Promise<GroupedInventoryItem[]> {
      return client.get('external/inventory/v2');
    },

    async getSteamInventory(): Promise<SteamInventoryItemV2[]> {
      return client.get('external/inventory/steam/v2');
    },

    async sellSteamItems(params: SellSteamItemsParams): Promise<any> {
      return client.post('external/inventory/steam/sell', params as unknown as Record<string, any>);
    },

    async sellItems(params: ListGroupedItemsParams): Promise<any> {
      return client.post('external/inventory/sell/v2', params as unknown as Record<string, any>);
    },

    async withdrawItems(params: WithdrawGroupedItemsParams): Promise<any> {
      return client.post('external/inventory/withdraw/v2', params as unknown as Record<string, any>);
    },
  };
}

export * from './types.js';
