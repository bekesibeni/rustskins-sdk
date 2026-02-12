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
      return client.get('external/listings/v2', params);
    },

    async updateListings(params: UpdateGroupedListingsParams): Promise<any> {
      return client.patch('external/listings/v2', params as unknown as Record<string, any>);
    },

    async delistListings(params: DelistGroupedListingsParams): Promise<any> {
      return client.delete('external/listings/v2', params as unknown as Record<string, any>);
    },

    async updatePricingStrategy(params: UpdateGroupedListingsPricingStrategyParams): Promise<any> {
      return client.patch('external/listings/pricing-strategy', params as unknown as Record<string, any>);
    },
  };
}

export * from './types.js';
