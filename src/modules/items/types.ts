import type { PaginationParams, BuyOrderState } from '../../core/types.js';

// ── Entities ────────────────────────────────────────────

export interface SteamItemType {
  id: number;
  appId: number | null;
  image: string | null;
  name: string;
  steamPrice: number | null;
}

export interface ItemBuyOrder {
  id: number;
  itemId: number;
  name: string;
  price: number;
  state: BuyOrderState;
  yours: boolean;
}

export interface ItemListing {
  id: number;
  amount: number;
  price: number;
  name: string;
  classid: string | null;
  yours: boolean;
}

export interface ItemRecentSale {
  id: number;
  itemId: number;
  name: string;
  amount: number;
  price: number;
  date: string;
}

// ── Params ──────────────────────────────────────────────

export interface SearchItemsParams extends PaginationParams {
  name?: string;
  appId?: number;
}

export interface GetItemBuyOrdersParams extends PaginationParams {
  id: number;
}

export interface GetItemListingsParams extends PaginationParams {
  id: number;
}

export interface GetItemRecentSalesParams extends PaginationParams {
  id: number;
}
