import type { PaginationParams } from '../../core/types.js';

// ── Entities ────────────────────────────────────────────

export interface GroupedListing {
  itemId: number;
  name: string;
  appid: number;
  classid: string | null;
  amount: number;
  price: number;
  sellerFeePercentage: number;
  sellerFeePerItem: number;
  pricingStrategy: string | null;
  updateInterval: string | null;
  stopPrice: number | null;
}

// ── Params ──────────────────────────────────────────────

export interface GetListingsParams extends PaginationParams {
  name?: string;
}

export interface UpdateGroupedListingInput {
  itemId: number;
  amount: number;
  price: number;
  sellerFeePerItem: number;
  pricingStrategy: string | null;
  updateInterval: string | null;
  stopPrice: number | null;
  newPrice: number;
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
  pricingStrategy: string | null;
  updateInterval: string | null;
  stopPrice: number | null;
}

export interface DelistGroupedListingsParams {
  listings: DelistGroupedListingInput[];
}
