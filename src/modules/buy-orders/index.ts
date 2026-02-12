import type { RustSkinsClient } from '../../core/client.js';
import type {
  GetBuyOrdersDataParams,
  GetBuyOrdersParams,
  PlaceBuyOrdersParams,
  UpdateGroupedBuyOrdersParams,
  CancelGroupedBuyOrdersParams,
  BuyOrdersDataItem,
  GroupedBuyOrder,
} from './types.js';

export function initBuyOrdersModule(client: RustSkinsClient) {
  return {
    async getBuyOrdersData(params?: GetBuyOrdersDataParams): Promise<BuyOrdersDataItem[]> {
      const appId = params?.appId ?? 252490;
      return client.get(`external/buy-orders/data/${appId}`);
    },

    async getBuyOrders(params?: GetBuyOrdersParams): Promise<GroupedBuyOrder[]> {
      return client.get('external/buy-orders/v2', params);
    },

    async createBuyOrders(params: PlaceBuyOrdersParams): Promise<any> {
      return client.post('external/buy-orders/v2', params as unknown as Record<string, any>);
    },

    async updateBuyOrders(params: UpdateGroupedBuyOrdersParams): Promise<any> {
      return client.patch('external/buy-orders/v2', params as unknown as Record<string, any>);
    },

    async cancelBuyOrders(params: CancelGroupedBuyOrdersParams): Promise<any> {
      return client.delete('external/buy-orders/v2', params as unknown as Record<string, any>);
    },

    async cancelAllBuyOrders(): Promise<any> {
      return client.delete('external/buy-orders/all');
    },
  };
}

export * from './types.js';
