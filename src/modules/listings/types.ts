import type { PaginationParams } from '../../core/types.js';

export interface GroupedListing {
  itemId: number;
  name: string;
  amount: number;
  price: number;
  sellerFeePerItem: number;
  appid?: number;
  classid?: string | null;
  sellerFeePercentage?: number;
  pricingStrategy?: string | null;
  updateInterval?: string | null;
  stopPrice?: number | null;
}

export interface GetListingsParams extends PaginationParams {
  appId?: number;
  name?: string;
}

export interface UpdateGroupedListingInput {
  itemId: number;
  amount: number;
  price: number;
  sellerFeePerItem: number;
  newPrice: number;
  pricingStrategy?: string | null;
  updateInterval?: string | null;
  stopPrice?: number | null;
}

export interface UpdateGroupedListingsParams {
  listings: UpdateGroupedListingInput[];
}

export interface UpdateGroupedListingPricingStrategyInput {
  itemId: number;
  amount: number;
  price: number;
  sellerFeePerItem: number;
  pricingStrategy: string | null;
  updateInterval: string | null;
  stopPrice: number | null;
  newPricingStrategy: string | null;
  newUpdateInterval: number | null;
  newStopPrice: number | null;
}

export interface UpdateGroupedListingsPricingStrategyParams {
  listings: UpdateGroupedListingPricingStrategyInput[];
}

export interface DelistGroupedListingInput {
  itemId: number;
  amount: number;
  price: number;
  sellerFeePerItem: number;
  pricingStrategy?: string | null;
  updateInterval?: string | null;
  stopPrice?: number | null;
}

export interface DelistGroupedListingsParams {
  listings: DelistGroupedListingInput[];
}
