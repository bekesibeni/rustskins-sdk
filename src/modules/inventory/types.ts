// ── Entities ────────────────────────────────────────────

export interface InventoryItem {
  id: number;
  name: string;
  appid: number;
  classid: string | null;
  amount: number;
  withdrawable: boolean;
}

export interface GroupedInventoryItem {
  itemId: number;
  name: string;
  appid: number;
  classid: string | null;
  amount: number;
}

export interface SteamItemPriceSuggestions {
  lastSalePrice: number | null;
  recentSalesAvg: number | null;
  lowestOffer: number | null;
  dampedLowestOffer: number | null;
  highestOrder: number | null;
  steamPriceDiscount: number | null;
}

export interface SteamInventoryItemV2 {
  steamItemId: number;
  name: string;
  image: string | null;
  amount: number;
  appid: number;
  contextid: string;
  tradable: boolean;
  steamPrice?: number | null;
  float?: number | null;
  pattern?: number | null;
  inspectLink?: string | null;
  suggestedPrices?: SteamItemPriceSuggestions | null;
}

// ── Params ──────────────────────────────────────────────

export interface RequestSteamDepositItem {
  steamItemId: number;
  amount: number;
  price?: number | null;
  pricingStrategy: string | null;
  updateInterval: number | null;
  stopPrice: number | null;
}

export interface SellSteamItemsParams {
  items: RequestSteamDepositItem[];
}

export interface WithdrawGroupedItemInput {
  itemId: number;
  amount: number;
}

export interface WithdrawGroupedItemsParams {
  items: WithdrawGroupedItemInput[];
}

export interface ListGroupedItemInput {
  itemId: number;
  amount: number;
  price: number;
  pricingStrategy: string | null;
  updateInterval: number | null;
  stopPrice: number | null;
}

export interface ListGroupedItemsParams {
  items: ListGroupedItemInput[];
}
