import type { PaginationParams } from '../../core/types.js';

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

export interface GetPriceComparisonParams extends PaginationParams {
  name?: string;
  appId?: number;
}
