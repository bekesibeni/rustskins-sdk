import type { PaginationParams, MarketplaceOrderDirection } from '../../core/types.js';

export interface MarketplaceDataItemLocked {
  count: number;
  price: number;
  listingId: number;
}

export interface MarketplaceDataItem {
  item: string;
  image: string | null;
  price: number;
  steamPrice: number | null;
  count: number;
  itemId: number;
  listingId: number;
  locked?: MarketplaceDataItemLocked | null;
}

export interface MarketplaceDataV2Item {
  name: string;
  itemId: number;
  itemVariantId: number;
  amount: number;
  price: number;
  steamPrice: number | null;
  image: string | null;
}

export interface MarketplaceItem {
  id: number;
  name: string;
  appid: number;
  price: number;
  steamPrice: number | null;
  amount: number;
  pricingStrategy: string | null;
  updateInterval: string | null;
  stopPrice: number | null;
}

export interface MarketplaceTransaction {
  id: number;
  itemId: number;
  name: string;
  amount: number;
  price: number;
  date: string;
}

export interface GetMarketplaceDataParams {
  appId?: number;
}

export interface GetMarketplaceDataV2QueryParams {
  appId?: number;
}

export interface SearchMarketplaceParams extends PaginationParams {
  name?: string;
  order?: MarketplaceOrderDirection;
  appId?: number;
}

export interface GetSalesParams extends PaginationParams {}

export interface GetPurchasesParams extends PaginationParams {}

export interface BuyMarketplaceItemInput {
  id: number;
  amount: number;
  price: number;
}

export interface BuyMarketplaceItemsParams {
  items: BuyMarketplaceItemInput[];
}

export interface ResellMarketplaceItemsParams {
  items: BuyMarketplaceItemInput[];
  tradeUrl: string;
}
