import type { PaginationParams } from '../../core/types.js';

export interface RustSkinsUser {
  id: number;
  email: string | null;
  tradeUrl: string | null;
  steamId: string;
  balance: number;
}

export interface UserTrade {
  id: number;
  state: string;
  steamTradeId?: string | null;
}

/** @deprecated Use `UserTrade`. */
export type Trade = UserTrade;

export interface Referral {
  steamId: string;
  totalDeposited: number;
}

export interface UpdateUserParams {
  tradeUrl?: string | null;
  email?: string | null;
}

export interface GetTradesParams extends PaginationParams {
  deposit?: boolean;
}

export interface GetReferralsParams extends PaginationParams {}

export interface CheckReferralParams {
  steamId: string;
}
