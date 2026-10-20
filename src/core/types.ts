
export interface PaginationParams {
  page?: number;
  take?: number;
}

export type TradeState =
  | 'invalid'
  | 'active'
  | 'accepted'
  | 'countered'
  | 'expired'
  | 'canceled'
  | 'declined'
  | 'invalid items'
  | 'created needs confirmation'
  | 'canceled by second factor'
  | 'in escrow'
  | 'creating'
  | 'invalid trade link'
  | 'queued'
  | 'game servers are down'
  | 'inventory is full'
  | 'steam guard error'
  | 'inventory is private'
  | 'reversed';

export type BuyOrderState = 'active' | 'completed' | 'cancelled';

export type InstantSalePayoutType = 'balance' | 'crypto' | 'paypal';

export type CryptoCurrency = 'BTC' | 'ETH' | 'LTC' | 'TRX' | 'USDT' | 'XRP' | 'USDC' | 'SOL';

export type CryptoNetwork = 'BTC' | 'ETH' | 'LTC' | 'TRX' | 'XRP' | 'SOL';

export type MarketplaceOrderDirection = 'ASC' | 'DESC' | 'DEALS';
