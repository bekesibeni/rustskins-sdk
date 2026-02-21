import type { TradeState } from '../../core/types.js';

// ── Entities ────────────────────────────────────────────

export interface MarketplaceDataItemLockedV2 {
  count: number;
  price: number;
  listingId: number;
}

export interface MarketplaceDataItemV2 {
  item: string;
  image: string | null;
  price: number;
  steamPrice: number | null;
  count: number;
  itemId: number;
  listingId: number;
  locked?: MarketplaceDataItemLockedV2 | null;
  prices: number[][];
}

export interface InstantSellPrice {
  name: string;
  image: string | null;
  itemId: number;
  instantSellPrice: number;
  instantSellAmount: number;
}

export interface ProjectTrade {
  id: number;
  steamTradeId: string | null;
  state: TradeState;
  orderId: string;
}

// ── Params ──────────────────────────────────────────────

export interface GetMarketplaceDataV2Params {
  appId?: number;
}

export interface GetSellDataParams {
  projectId?: number;
  appId?: number;
}

export interface GetSteamInventoryParams {
  name?: string;
  order?: string;
  appId?: number;
  steamId: string;
}

export interface PurchaseWithdrawalItemV2 {
  itemId: number;
  maxPrices: number[];
}

export interface PurchaseWithdrawalV2Params {
  items: PurchaseWithdrawalItemV2[];
  tradeUrl: string;
  projectId?: number;
  orderId: string;
}

export interface RequestSaleInputItem {
  itemId: number;
  amount: number;
  price: number;
}

export interface SellItemsParams {
  items: RequestSaleInputItem[];
  tradeUrl: string;
  projectId?: number;
}

export interface GetTradeParams {
  id: number;
  projectId?: number;
}

export interface GetTradeByOrderParams {
  id: string;
  projectId?: number;
}

export interface GetTradesByTradeUrlParams {
  tradeUrl: string;
  projectId?: number;
}
