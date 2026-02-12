import type { PaginationParams } from '../../core/types.js';

// ── Entities ────────────────────────────────────────────

export interface PriceComparisonItem {
  name: string;
  rustskinsPrice: number | null;
  csdealsPrice: number | null;
  skinportPrice: number | null;
  shadowpayPrice: number | null;
  dmarketPrice: number | null;
  lootfarmPrice: number | null;
  rusttmPrice: number | null;
  lisskinsPrice: number | null;
}

// ── Params ──────────────────────────────────────────────

export interface GetPriceComparisonParams extends PaginationParams {
  name?: string;
  appId?: number;
}
