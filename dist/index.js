import { HttpClient } from '@benji/stdlib/http.js';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';

// src/core/client.ts
var DEFAULT_BASE_URL = "https://api.rustskins.com";
var SDK_VERSION = "1.0.0";
var RustSkinsClient = class {
  http;
  baseUrl;
  proxyAgents;
  projectId;
  constructor({ apiKey, projectId, baseUrl = DEFAULT_BASE_URL, proxy }) {
    this.projectId = projectId;
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const httpOptions = {
      defaultHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": `RustSkinsSDK/${SDK_VERSION} (+https://rustskins.com)`,
        "Authorization": `Bearer ${apiKey}`
      }
    };
    if (proxy) {
      let proxyUrl = proxy;
      if (!proxy.startsWith("http://") && !proxy.startsWith("https://") && !proxy.startsWith("socks5://")) {
        proxyUrl = `socks5://${proxy}`;
      }
      if (proxyUrl.startsWith("socks5://")) {
        const httpsAgent = new SocksProxyAgent(proxyUrl);
        const httpAgent = new SocksProxyAgent(proxyUrl);
        this.proxyAgents = { https: httpsAgent, http: httpAgent };
      } else {
        const httpsAgent = new HttpsProxyAgent(proxyUrl);
        const httpAgent = new HttpProxyAgent(proxyUrl);
        this.proxyAgents = { https: httpsAgent, http: httpAgent };
      }
      httpOptions.httpsAgent = this.proxyAgents.https;
      httpOptions.httpAgent = this.proxyAgents.http;
    }
    this.http = new HttpClient(httpOptions);
  }
  destroy() {
    try {
      this.proxyAgents?.http?.destroy?.();
    } finally {
      this.proxyAgents?.https?.destroy?.();
    }
  }
  normalizePath(path) {
    return path.replace(/^\/+/, "");
  }
  buildUrl(path, query) {
    const cleanPath = this.normalizePath(path);
    const url = new URL(cleanPath, this.baseUrl);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== void 0 && value !== null) {
          url.searchParams.append(key, String(value));
        }
      }
    }
    return url.toString();
  }
  assertOk(response) {
    if (response.statusCode < 200 || response.statusCode >= 300) {
      const body = response.jsonBody;
      throw new Error(
        `RustSkins API error ${response.statusCode}: ${JSON.stringify(body)}`
      );
    }
  }
  async get(path, query) {
    const url = this.buildUrl(path, query);
    const response = await this.http.request({
      method: "GET",
      url
    });
    this.assertOk(response);
    return response.jsonBody;
  }
  async post(path, body) {
    const url = this.buildUrl(path);
    const response = await this.http.request({
      method: "POST",
      url,
      json: body
    });
    this.assertOk(response);
    return response.jsonBody;
  }
  async patch(path, body) {
    const url = this.buildUrl(path);
    const response = await this.http.request({
      method: "PATCH",
      url,
      json: body
    });
    this.assertOk(response);
    return response.jsonBody;
  }
  async delete(path, body) {
    const url = this.buildUrl(path);
    const response = await this.http.request({
      method: "DELETE",
      url,
      json: body
    });
    this.assertOk(response);
    return response.jsonBody;
  }
};

// src/modules/marketplace/index.ts
function initMarketplaceModule(client) {
  return {
    async getMarketplaceData(params) {
      const appId = params?.appId ?? 252490;
      return client.get(`external/marketplace/data/${appId}`);
    },
    async getTf2MarketplaceData() {
      return client.get("external/marketplace/tf2-data");
    },
    async searchItems(params) {
      return client.get("external/marketplace/items", params);
    },
    async getSales(params) {
      return client.get("external/marketplace/sales", params);
    },
    async getPurchases(params) {
      return client.get("external/marketplace/purchases", params);
    },
    async purchase(params) {
      return client.post("external/marketplace/purchase", params);
    },
    async resell(params) {
      return client.post("external/marketplace/resell", params);
    }
  };
}

// src/modules/inventory/index.ts
function initInventoryModule(client) {
  return {
    async getInventory() {
      return client.get("external/inventory/v2");
    },
    async getSteamInventory() {
      return client.get("external/inventory/steam/v2");
    },
    async sellSteamItems(params) {
      return client.post("external/inventory/steam/sell", params);
    },
    async sellItems(params) {
      return client.post("external/inventory/sell/v2", params);
    },
    async withdrawItems(params) {
      return client.post("external/inventory/withdraw/v2", params);
    }
  };
}

// src/modules/listings/index.ts
function initListingsModule(client) {
  return {
    async getListings(params) {
      return client.get("external/listings/v2", params);
    },
    async updateListings(params) {
      return client.patch("external/listings/v2", params);
    },
    async delistListings(params) {
      return client.delete("external/listings/v2", params);
    },
    async updatePricingStrategy(params) {
      return client.patch("external/listings/pricing-strategy", params);
    }
  };
}

// src/modules/buy-orders/index.ts
function initBuyOrdersModule(client) {
  return {
    async getBuyOrdersData(params) {
      const appId = params?.appId ?? 252490;
      return client.get(`external/buy-orders/data/${appId}`);
    },
    async getBuyOrders(params) {
      return client.get("external/buy-orders/v2", params);
    },
    async createBuyOrders(params) {
      return client.post("external/buy-orders/v2", params);
    },
    async updateBuyOrders(params) {
      return client.patch("external/buy-orders/v2", params);
    },
    async cancelBuyOrders(params) {
      return client.delete("external/buy-orders/v2", params);
    },
    async cancelAllBuyOrders() {
      return client.delete("external/buy-orders/all");
    }
  };
}

// src/modules/user/index.ts
function initUserModule(client) {
  return {
    async getUser() {
      return client.get("external/user");
    },
    async updateUser(params) {
      return client.patch("external/user", params);
    },
    async getTrades(params) {
      return client.get("external/user/trades", params);
    },
    async getReferrals(params) {
      return client.get("external/user/referrals", params);
    },
    async checkReferral(params) {
      return client.get(`external/user/referrals/${params.steamId}`);
    }
  };
}

// src/modules/items/index.ts
function initItemsModule(client) {
  return {
    async searchItems(params) {
      return client.get("external/items", params);
    },
    async getItemBuyOrders(params) {
      const { id, ...query } = params;
      return client.get(`external/items/${id}/buy-orders`, query);
    },
    async getItemListings(params) {
      const { id, ...query } = params;
      return client.get(`external/items/${id}/listings`, query);
    },
    async getItemRecentSales(params) {
      const { id, ...query } = params;
      return client.get(`external/items/${id}/recent-sales`, query);
    }
  };
}

// src/modules/instant-sale/index.ts
function initInstantSaleModule(client) {
  return {
    async getPrices(params) {
      return client.get("external/instant-sale/prices", params);
    },
    async getSteamInventory() {
      return client.get("external/instant-sale/steam");
    },
    async instantSellSteam(params) {
      return client.post("external/instant-sale/steam", params);
    },
    async instantSellInventory(params) {
      return client.post("external/instant-sale/inventory/v2", params);
    },
    async instantSellListings(params) {
      return client.post("external/instant-sale/listings/v2", params);
    }
  };
}

// src/modules/price-comparison/index.ts
function initPriceComparisonModule(client) {
  return {
    async getPriceComparison(params) {
      return client.get("external/price-comparison", params);
    }
  };
}

// src/modules/partner/index.ts
function initPartnerModule(client) {
  const getProjectId = (providedId) => {
    const projectId = providedId ?? client.projectId;
    if (!projectId) {
      throw new Error("projectId is required. Provide it in the SDK constructor or method call.");
    }
    return projectId;
  };
  return {
    async getMarketplaceData(params) {
      const appId = params?.appId ?? 252490;
      return client.get(`projects/marketplace/data/v2/${appId}`);
    },
    async getSellData(params) {
      const projectId = getProjectId(params.projectId);
      const { appId = 252490 } = params;
      return client.get(`projects/marketplace/sell-data/${appId}`, { projectId });
    },
    async getSteamInventory(params) {
      return client.get("projects/inventory/steam", params);
    },
    async purchaseAndWithdraw(params) {
      const projectId = getProjectId(params.projectId);
      return client.post("projects/trade/purchase/v2", { ...params, projectId });
    },
    async sellItems(params) {
      const projectId = getProjectId(params.projectId);
      return client.post("projects/trade/sell", { ...params, projectId });
    },
    async getTrade(params) {
      const projectId = getProjectId(params.projectId);
      const { id } = params;
      return client.get(`projects/trade/${id}`, { projectId });
    },
    async getTradeByOrder(params) {
      const projectId = getProjectId(params.projectId);
      const { id } = params;
      return client.get(`projects/trade/order/${id}`, { projectId });
    },
    async getTradesByTradeUrl(params) {
      const projectId = getProjectId(params.projectId);
      return client.post("projects/trade/tradeurl", { ...params, projectId });
    }
  };
}

// src/rustskins.ts
var RustSkinsSDK = class {
  marketplace;
  inventory;
  listings;
  buyOrders;
  user;
  items;
  instantSale;
  priceComparison;
  partner;
  client;
  constructor(options) {
    this.client = new RustSkinsClient(options);
    this.marketplace = initMarketplaceModule(this.client);
    this.inventory = initInventoryModule(this.client);
    this.listings = initListingsModule(this.client);
    this.buyOrders = initBuyOrdersModule(this.client);
    this.user = initUserModule(this.client);
    this.items = initItemsModule(this.client);
    this.instantSale = initInstantSaleModule(this.client);
    this.priceComparison = initPriceComparisonModule(this.client);
    this.partner = initPartnerModule(this.client);
  }
  destroy() {
    this.client.destroy();
  }
};

export { RustSkinsClient, RustSkinsSDK, initBuyOrdersModule, initInstantSaleModule, initInventoryModule, initItemsModule, initListingsModule, initMarketplaceModule, initPartnerModule, initPriceComparisonModule, initUserModule };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map