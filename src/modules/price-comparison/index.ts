import type { RustSkinsClient } from '../../core/client.js';
import type {
  GetPriceComparisonParams,
  PriceComparisonItem,
} from './types.js';

export function initPriceComparisonModule(client: RustSkinsClient) {
  return {
    async getPriceComparison(params?: GetPriceComparisonParams): Promise<PriceComparisonItem[]> {
      return client.get('external/price-comparison', params);
    },
  };
}

export * from './types.js';
