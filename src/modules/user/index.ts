import type { RustSkinsClient } from '../../core/client.js';
import type {
  RustSkinsUser,
  Trade,
  Referral,
  UpdateUserParams,
  GetTradesParams,
  GetReferralsParams,
  CheckReferralParams,
} from './types.js';

export function initUserModule(client: RustSkinsClient) {
  return {
    async getUser(): Promise<RustSkinsUser> {
      return client.get('external/user');
    },

    async updateUser(params: UpdateUserParams): Promise<RustSkinsUser> {
      return client.patch('external/user', params as Record<string, any>);
    },

    async getTrades(params?: GetTradesParams): Promise<Trade[]> {
      return client.get('external/user/trades', params);
    },

    async getReferrals(params?: GetReferralsParams): Promise<Referral[]> {
      return client.get('external/user/referrals', params);
    },

    async checkReferral(params: CheckReferralParams): Promise<boolean> {
      return client.get(`external/user/referrals/${params.steamId}`);
    },
  };
}

export * from './types.js';
