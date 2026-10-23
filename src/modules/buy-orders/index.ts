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
      return client.get('external/buy-orders/v2', { name: params?.name, page: params?.page, take: params?.take });
    },

    async createBuyOrders(params: PlaceBuyOrdersParams): Promise<GroupedBuyOrder[]> {
      return client.post('external/buy-orders/v2', { items: params.items });
    },

    async updateBuyOrders(params: UpdateGroupedBuyOrdersParams): Promise<GroupedBuyOrder[]> {
      return client.patch('external/buy-orders/v2', { orders: params.orders });
    },

    async cancelBuyOrders(params: CancelGroupedBuyOrdersParams): Promise<GroupedBuyOrder[]> {
      return client.delete('external/buy-orders/v2', { orders: params.orders });
    },

    async cancelAllBuyOrders(): Promise<any> {
      return client.delete('external/buy-orders/all');
    },
  };
}

export * from './types.js';
