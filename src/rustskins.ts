import { RustSkinsClient, type RustSkinsClientOptions } from './core/client.js';
import { initMarketplaceModule } from './modules/marketplace/index.js';
import { initInventoryModule } from './modules/inventory/index.js';
import { initListingsModule } from './modules/listings/index.js';
import { initBuyOrdersModule } from './modules/buy-orders/index.js';
import { initUserModule } from './modules/user/index.js';
import { initItemsModule } from './modules/items/index.js';
import { initInstantSaleModule } from './modules/instant-sale/index.js';
import { initPriceComparisonModule } from './modules/price-comparison/index.js';
import { initPartnerModule } from './modules/partner/index.js';

export class RustSkinsSDK {
  public readonly marketplace;
  public readonly inventory;
  public readonly listings;
  public readonly buyOrders;
  public readonly user;
  public readonly items;
  public readonly instantSale;
  public readonly priceComparison;
  public readonly partner;
  private readonly client: RustSkinsClient;

  constructor(options: RustSkinsClientOptions) {
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

  destroy(): void {
    this.client.destroy();
  }
}
