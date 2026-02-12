import type { PaginationParams, InstantSalePayoutType, CryptoCurrency, CryptoNetwork } from '../../core/types.js';

// ── Entities ────────────────────────────────────────────

export interface InstantSalePriceItem {
  id: number;
  appId: number | null;
  contextId: string | null;
  name: string;
  price: number;
  amount: number;
}

export interface InstantSaleInventoryItem {
  assetid: string;
  appid: number;
  contextid: string;
  amount: number;
  name: string;
  classid: string | null;
  steamPrice: number | null;
  instantSalePrice: number;
}

export interface InstantSaleInventory {
  username: string;
  avatar: string;
  steamId: string;
  availableItems: InstantSaleInventoryItem[];
  unavailableItems: InstantSaleInventoryItem[];
}

export interface InstantSaleItem {
  id: number;
  price: number;
  name: string;
  amount: number;
}

// ── Params ──────────────────────────────────────────────

export interface GetInstantSalePricesParams extends PaginationParams {
  name?: string;
  appId?: number;
}

export interface SteamDepositItem {
  assetid: string;
  appid: number;
  contextid: string;
  amount: number;
  priceToList?: number | null;
  instantSalePrice?: number | null;
}

export interface InstantSellSteamParams {
  items: SteamDepositItem[];
  type: InstantSalePayoutType;
  currency?: CryptoCurrency | null;
  network?: CryptoNetwork | null;
  address?: string | null;
  destinationTag?: string | null;
  email?: string | null;
}

export interface InventoryInstantSellItemInput {
  itemId: number;
  amount: number;
  instantSellPrice: number;
}

export interface InventoryInstantSellParams {
  items: InventoryInstantSellItemInput[];
}

export interface MarketInstantSellItemInput {
  itemId: number;
  amount: number;
  price: number;
  sellerFeePerItem: number;
  pricingStrategy: string | null;
  updateInterval: string | null;
  stopPrice: number | null;
  instantSellPrice: number;
}

export interface MarketInstantSellListingsParams {
  listings: MarketInstantSellItemInput[];
}
