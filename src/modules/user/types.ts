import type { PaginationParams, TradeState } from '../../core/types.js';

// ── Entities ────────────────────────────────────────────

export interface RustSkinsUser {
  id: number;
  email: string | null;
  tradeUrl: string | null;
  steamId: string;
  balance: number;
}

export interface Trade {
  id: number;
  steamTradeId: string | null;
  state: TradeState;
}

export interface Referral {
  steamId: string;
  totalDeposited: number;
}

// ── Params ──────────────────────────────────────────────

export interface UpdateUserParams {
  tradeUrl?: string | null;
  email?: string | null;
}

export interface GetTradesParams extends PaginationParams {}

export interface GetReferralsParams extends PaginationParams {}

export interface CheckReferralParams {
  steamId: string;
}
