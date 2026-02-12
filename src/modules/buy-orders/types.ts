import type { PaginationParams, BuyOrderState } from '../../core/types.js';

// ── Entities ────────────────────────────────────────────

export interface BuyOrdersDataItem {
  item: string;
  price: number;
  count: number;
}

export interface GroupedBuyOrder {
  itemId: number;
  name: string;
  amount: number;
  price: number;
  active: boolean;
  keepActive: boolean;
}

export interface BuyOrder {
  id: number;
  itemId: number;
  name: string;
  price: number;
  state: BuyOrderState;
  yours: boolean;
}

// ── Params ──────────────────────────────────────────────

export interface GetBuyOrdersDataParams {
  appId?: number;
}

export interface GetBuyOrdersParams extends PaginationParams {
  name?: string;
}

export interface PlaceBuyOrderItemInput {
  itemId: number;
  price: number;
  amount: number;
  keepActive: boolean;
}

export interface PlaceBuyOrdersParams {
  items: PlaceBuyOrderItemInput[];
}

export interface UpdateGroupedBuyOrderInput {
  itemId: number;
  amount: number;
  active: boolean;
  price: number;
  newPrice: number;
  keepActive: boolean;
  newKeepActive: boolean;
}

export interface UpdateGroupedBuyOrdersParams {
  orders: UpdateGroupedBuyOrderInput[];
}

export interface CancelGroupedBuyOrderInput {
  itemId: number;
  amount: number;
  active: boolean;
  price: number;
}

export interface CancelGroupedBuyOrdersParams {
  orders: CancelGroupedBuyOrderInput[];
}
