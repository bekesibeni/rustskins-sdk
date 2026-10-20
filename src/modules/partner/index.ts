import type { RustSkinsClient } from '../../core/client.js';
import type {
  GetMarketplaceDataV2Params,
  GetSellDataParams,
  GetSteamInventoryParams,
  PurchaseWithdrawalV2Params,
  SellItemsParams,
  GetTradeParams,
  GetTradeByOrderParams,
  GetTradesByTradeUrlParams,
  MarketplaceDataItemV2,
  InstantSellPrice,
  ProjectTrade,
} from './types.js';
import type { SteamInventoryItemV2 } from '../inventory/types.js';

export function initPartnerModule(client: RustSkinsClient) {
  const getProjectId = (providedId?: number): number => {
    const projectId = providedId ?? client.projectId;
    if (!projectId) throw new Error('projectId is required. Provide it in the SDK constructor or method call.');
    return projectId;
  };

  return {
    async getMarketplaceData(params?: GetMarketplaceDataV2Params): Promise<MarketplaceDataItemV2[]> {
      const appId = params?.appId ?? 252490;
      return client.get(`projects/marketplace/data/v2/${appId}`);
    },

    async getSellData(params: GetSellDataParams): Promise<InstantSellPrice[]> {
      const projectId = getProjectId(params.projectId);
      const appId = params.appId ?? 252490;
      return client.get(`projects/marketplace/sell-data/${appId}`, { projectId });
    },

    async getSteamInventory(params: GetSteamInventoryParams): Promise<SteamInventoryItemV2[]> {
      return client.get('projects/inventory/steam', {
        name: params.name,
        order: params.order,
        appId: params.appId,
        steamId: params.steamId,
      });
    },

    async purchaseAndWithdraw(params: PurchaseWithdrawalV2Params): Promise<ProjectTrade[]> {
      const projectId = getProjectId(params.projectId);
      return client.post('projects/trade/purchase/v2', { ...params, projectId });
    },

    async sellItems(params: SellItemsParams): Promise<ProjectTrade> {
      const projectId = getProjectId(params.projectId);
      return client.post('projects/trade/sell', { ...params, projectId });
    },

    async getTrade(params: GetTradeParams): Promise<ProjectTrade> {
      const projectId = getProjectId(params.projectId);
      return client.get(`projects/trade/${params.id}`, { projectId });
    },

    async getTradeByOrder(params: GetTradeByOrderParams): Promise<ProjectTrade> {
      const projectId = getProjectId(params.projectId);
      return client.get(`projects/trade/order/${params.id}`, { projectId });
    },

    async getTradesByTradeUrl(params: GetTradesByTradeUrlParams): Promise<ProjectTrade[]> {
      const projectId = getProjectId(params.projectId);
      return client.post('projects/trade/tradeurl', { ...params, projectId });
    },
  };
}

export * from './types.js';
