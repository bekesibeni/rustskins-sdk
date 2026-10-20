import type { RustSkinsClient } from '../../core/client.js';
import type {
  GetListingsParams,
  UpdateGroupedListingsParams,
  DelistGroupedListingsParams,
  UpdateGroupedListingsPricingStrategyParams,
  GroupedListing,
} from './types.js';

export function initListingsModule(client: RustSkinsClient) {
  return {
    async getListings(params?: GetListingsParams): Promise<GroupedListing[]> {
      return client.get('external/listings/v3', {
        appId: params?.appId ?? 252490,
        name: params?.name,
        page: params?.page,
        take: params?.take,
      });
    },

    async updateListings(params: UpdateGroupedListingsParams): Promise<any> {
      return client.patch('external/listings/v2', { listings: params.listings });
    },

    async delistListings(params: DelistGroupedListingsParams): Promise<any> {
      return client.delete('external/listings/v2', { listings: params.listings });
    },

    async updatePricingStrategy(params: UpdateGroupedListingsPricingStrategyParams): Promise<any> {
      return client.patch('external/listings/pricing-strategy', { listings: params.listings });
    },
  };
}

export * from './types.js';
