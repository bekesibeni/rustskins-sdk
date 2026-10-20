import type { RustSkinsClient } from '../../core/client.js';
import type {
  RustSkinsUser,
  UserTrade,
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
      return client.patch('external/user', { tradeUrl: params.tradeUrl, email: params.email });
    },

    async getTrades(params?: GetTradesParams): Promise<UserTrade[]> {
      return client.get('external/user/trades', {
        deposit: params?.deposit,
        page: params?.page,
        take: params?.take,
      });
    },

    async getReferrals(params?: GetReferralsParams): Promise<Referral[]> {
      return client.get('external/user/referrals', { page: params?.page, take: params?.take });
    },

    async checkReferral(params: CheckReferralParams): Promise<boolean> {
      return client.get(`external/user/referrals/${params.steamId}`);
    },
  };
}

export * from './types.js';
