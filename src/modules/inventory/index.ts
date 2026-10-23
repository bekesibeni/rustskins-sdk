import type { RustSkinsClient } from '../../core/client.js';
import type { UserTrade } from '../user/types.js';
import type {
  GetInventoryParams,
  GetSteamInventoryV2Params,
  GroupedInventoryItem,
  SteamInventoryItemV2,
  SellSteamItemsParams,
  ListGroupedItemsParams,
  WithdrawGroupedItemsParams,
} from './types.js';

export function initInventoryModule(client: RustSkinsClient) {
  return {
    async getInventory(params?: GetInventoryParams): Promise<GroupedInventoryItem[]> {
      return client.get('external/inventory/v2', { page: params?.page, take: params?.take });
    },

    async getSteamInventory(params?: GetSteamInventoryV2Params): Promise<SteamInventoryItemV2[]> {
      return client.get('external/inventory/steam/v2', {
        appId: params?.appId,
        addSuggestedPrices: params?.addSuggestedPrices,
      });
    },

    async sellSteamItems(params: SellSteamItemsParams): Promise<UserTrade | UserTrade[]> {
      return client.post('external/inventory/steam/sell', { items: params.items });
    },

    async sellItems(params: ListGroupedItemsParams): Promise<any> {
      return client.post('external/inventory/sell/v2', { items: params.items });
    },

    async withdrawItems(params: WithdrawGroupedItemsParams): Promise<UserTrade[]> {
      return client.post('external/inventory/withdraw/v2', { items: params.items });
    },
  };
}

export * from './types.js';
