interface RustSkinsClientOptions {
    apiKey: string;
    baseUrl?: string;
    proxy?: string;
}
declare class RustSkinsClient {
    private readonly http;
    private readonly baseUrl;
    private readonly proxyAgents?;
    constructor({ apiKey, baseUrl, proxy }: RustSkinsClientOptions);
    destroy(): void;
    private normalizePath;
    private buildUrl;
    private assertOk;
    get<T = any>(path: string, query?: Record<string, any>): Promise<T>;
    post<T = any>(path: string, body?: Record<string, any>): Promise<T>;
    patch<T = any>(path: string, body?: Record<string, any>): Promise<T>;
    delete<T = any>(path: string, body?: Record<string, any>): Promise<T>;
}

declare class RustSkinsSDK {
    readonly marketplace: {
        getMarketplaceData(params?: GetMarketplaceDataParams): Promise<MarketplaceDataItem[]>;
        getTf2MarketplaceData(): Promise<MarketplaceDataItem[]>;
        searchItems(params?: SearchMarketplaceParams): Promise<MarketplaceItem[]>;
        getSales(params?: GetSalesParams): Promise<MarketplaceTransaction[]>;
        getPurchases(params?: GetPurchasesParams): Promise<MarketplaceTransaction[]>;
        purchase(params: BuyMarketplaceItemsParams): Promise<any>;
        resell(params: ResellMarketplaceItemsParams): Promise<any>;
    };
    readonly inventory: {
        getInventory(): Promise<GroupedInventoryItem[]>;
        getSteamInventory(): Promise<SteamInventoryItemV2[]>;
        sellSteamItems(params: SellSteamItemsParams): Promise<any>;
        sellItems(params: ListGroupedItemsParams): Promise<any>;
        withdrawItems(params: WithdrawGroupedItemsParams): Promise<any>;
    };
    readonly listings: {
        getListings(params?: GetListingsParams): Promise<GroupedListing[]>;
        updateListings(params: UpdateGroupedListingsParams): Promise<any>;
        delistListings(params: DelistGroupedListingsParams): Promise<any>;
        updatePricingStrategy(params: UpdateGroupedListingsPricingStrategyParams): Promise<any>;
    };
    readonly buyOrders: {
        getBuyOrdersData(params?: GetBuyOrdersDataParams): Promise<BuyOrdersDataItem[]>;
        getBuyOrders(params?: GetBuyOrdersParams): Promise<GroupedBuyOrder[]>;
        createBuyOrders(params: PlaceBuyOrdersParams): Promise<any>;
        updateBuyOrders(params: UpdateGroupedBuyOrdersParams): Promise<any>;
        cancelBuyOrders(params: CancelGroupedBuyOrdersParams): Promise<any>;
        cancelAllBuyOrders(): Promise<any>;
    };
    readonly user: {
        getUser(): Promise<RustSkinsUser>;
        updateUser(params: UpdateUserParams): Promise<RustSkinsUser>;
        getTrades(params?: GetTradesParams): Promise<Trade[]>;
        getReferrals(params?: GetReferralsParams): Promise<Referral[]>;
        checkReferral(params: CheckReferralParams): Promise<boolean>;
    };
    readonly items: {
        searchItems(params?: SearchItemsParams): Promise<SteamItemType[]>;
        getItemBuyOrders(params: GetItemBuyOrdersParams): Promise<ItemBuyOrder[]>;
        getItemListings(params: GetItemListingsParams): Promise<ItemListing[]>;
        getItemRecentSales(params: GetItemRecentSalesParams): Promise<ItemRecentSale[]>;
    };
    readonly instantSale: {
        getPrices(params?: GetInstantSalePricesParams): Promise<InstantSalePriceItem[]>;
        getSteamInventory(): Promise<InstantSaleInventory>;
        instantSellSteam(params: InstantSellSteamParams): Promise<any>;
        instantSellInventory(params: InventoryInstantSellParams): Promise<InstantSaleItem[]>;
        instantSellListings(params: MarketInstantSellListingsParams): Promise<InstantSaleItem[]>;
    };
    readonly priceComparison: {
        getPriceComparison(params?: GetPriceComparisonParams): Promise<PriceComparisonItem[]>;
    };
    private readonly client;
    constructor(options: RustSkinsClientOptions);
    destroy(): void;
}

interface PaginationParams {
    page?: number;
    take?: number;
}
type TradeState = 'invalid' | 'active' | 'accepted' | 'countered' | 'expired' | 'canceled' | 'declined' | 'invalid items' | 'created needs confirmation' | 'canceled by second factor' | 'in escrow' | 'creating' | 'invalid trade link' | 'queued' | 'game servers are down' | 'inventory is full' | 'steam guard error';
type BuyOrderState = 'active' | 'completed' | 'cancelled';
type InstantSalePayoutType = 'balance' | 'crypto' | 'paypal';
type CryptoCurrency = 'BTC' | 'ETH' | 'LTC' | 'TRX' | 'USDT' | 'XRP' | 'USDC' | 'SOL';
type CryptoNetwork = 'BTC' | 'ETH' | 'LTC' | 'TRX' | 'XRP' | 'SOL';
type MarketplaceOrderDirection = 'ASC' | 'DESC' | 'DEALS';

interface MarketplaceDataItemLocked {
    count: number;
    price: number;
    listingId: number;
}
interface MarketplaceDataItem {
    item: string;
    image: string | null;
    price: number;
    steamPrice: number | null;
    count: number;
    itemId: number;
    listingId: number;
    locked?: MarketplaceDataItemLocked | null;
}
interface MarketplaceItem {
    id: number;
    name: string;
    appid: number;
    price: number;
    steamPrice: number | null;
    amount: number;
    pricingStrategy: string | null;
    updateInterval: string | null;
    stopPrice: number | null;
}
interface MarketplaceTransaction {
    id: number;
    itemId: number;
    name: string;
    amount: number;
    price: number;
    date: string;
}
interface GetMarketplaceDataParams {
    appId?: number;
}
interface SearchMarketplaceParams extends PaginationParams {
    name?: string;
    order?: MarketplaceOrderDirection;
    appId?: number;
}
interface GetSalesParams extends PaginationParams {
}
interface GetPurchasesParams extends PaginationParams {
}
interface BuyMarketplaceItemInput {
    id: number;
    amount: number;
    price: number;
}
interface BuyMarketplaceItemsParams {
    items: BuyMarketplaceItemInput[];
}
interface ResellMarketplaceItemsParams {
    items: BuyMarketplaceItemInput[];
    tradeUrl: string;
}

declare function initMarketplaceModule(client: RustSkinsClient): {
    getMarketplaceData(params?: GetMarketplaceDataParams): Promise<MarketplaceDataItem[]>;
    getTf2MarketplaceData(): Promise<MarketplaceDataItem[]>;
    searchItems(params?: SearchMarketplaceParams): Promise<MarketplaceItem[]>;
    getSales(params?: GetSalesParams): Promise<MarketplaceTransaction[]>;
    getPurchases(params?: GetPurchasesParams): Promise<MarketplaceTransaction[]>;
    purchase(params: BuyMarketplaceItemsParams): Promise<any>;
    resell(params: ResellMarketplaceItemsParams): Promise<any>;
};

interface InventoryItem {
    id: number;
    name: string;
    appid: number;
    classid: string | null;
    amount: number;
    withdrawable: boolean;
}
interface GroupedInventoryItem {
    itemId: number;
    name: string;
    appid: number;
    classid: string | null;
    amount: number;
}
interface SteamItemPriceSuggestions {
    lastSalePrice: number | null;
    recentSalesAvg: number | null;
    lowestOffer: number | null;
    dampedLowestOffer: number | null;
    highestOrder: number | null;
    steamPriceDiscount: number | null;
}
interface SteamInventoryItemV2 {
    steamItemId: number;
    name: string;
    image: string | null;
    amount: number;
    appid: number;
    contextid: string;
    tradable: boolean;
    steamPrice?: number | null;
    float?: number | null;
    pattern?: number | null;
    inspectLink?: string | null;
    suggestedPrices?: SteamItemPriceSuggestions | null;
}
interface RequestSteamDepositItem {
    steamItemId: number;
    amount: number;
    price?: number | null;
    pricingStrategy: string | null;
    updateInterval: number | null;
    stopPrice: number | null;
}
interface SellSteamItemsParams {
    items: RequestSteamDepositItem[];
}
interface WithdrawGroupedItemInput {
    itemId: number;
    amount: number;
}
interface WithdrawGroupedItemsParams {
    items: WithdrawGroupedItemInput[];
}
interface ListGroupedItemInput {
    itemId: number;
    amount: number;
    price: number;
    pricingStrategy: string | null;
    updateInterval: number | null;
    stopPrice: number | null;
}
interface ListGroupedItemsParams {
    items: ListGroupedItemInput[];
}

declare function initInventoryModule(client: RustSkinsClient): {
    getInventory(): Promise<GroupedInventoryItem[]>;
    getSteamInventory(): Promise<SteamInventoryItemV2[]>;
    sellSteamItems(params: SellSteamItemsParams): Promise<any>;
    sellItems(params: ListGroupedItemsParams): Promise<any>;
    withdrawItems(params: WithdrawGroupedItemsParams): Promise<any>;
};

interface GroupedListing {
    itemId: number;
    name: string;
    appid: number;
    classid: string | null;
    amount: number;
    price: number;
    sellerFeePercentage: number;
    sellerFeePerItem: number;
    pricingStrategy: string | null;
    updateInterval: string | null;
    stopPrice: number | null;
}
interface GetListingsParams extends PaginationParams {
    name?: string;
}
interface UpdateGroupedListingInput {
    itemId: number;
    amount: number;
    price: number;
    sellerFeePerItem: number;
    pricingStrategy: string | null;
    updateInterval: string | null;
    stopPrice: number | null;
    newPrice: number;
}
interface UpdateGroupedListingsParams {
    listings: UpdateGroupedListingInput[];
}
interface UpdateGroupedListingPricingStrategyInput {
    itemId: number;
    amount: number;
    price: number;
    sellerFeePerItem: number;
    pricingStrategy: string | null;
    updateInterval: string | null;
    stopPrice: number | null;
    newPricingStrategy: string | null;
    newUpdateInterval: number | null;
    newStopPrice: number | null;
}
interface UpdateGroupedListingsPricingStrategyParams {
    listings: UpdateGroupedListingPricingStrategyInput[];
}
interface DelistGroupedListingInput {
    itemId: number;
    amount: number;
    price: number;
    sellerFeePerItem: number;
    pricingStrategy: string | null;
    updateInterval: string | null;
    stopPrice: number | null;
}
interface DelistGroupedListingsParams {
    listings: DelistGroupedListingInput[];
}

declare function initListingsModule(client: RustSkinsClient): {
    getListings(params?: GetListingsParams): Promise<GroupedListing[]>;
    updateListings(params: UpdateGroupedListingsParams): Promise<any>;
    delistListings(params: DelistGroupedListingsParams): Promise<any>;
    updatePricingStrategy(params: UpdateGroupedListingsPricingStrategyParams): Promise<any>;
};

interface BuyOrdersDataItem {
    item: string;
    price: number;
    count: number;
}
interface GroupedBuyOrder {
    itemId: number;
    name: string;
    amount: number;
    price: number;
    active: boolean;
    keepActive: boolean;
}
interface BuyOrder {
    id: number;
    itemId: number;
    name: string;
    price: number;
    state: BuyOrderState;
    yours: boolean;
}
interface GetBuyOrdersDataParams {
    appId?: number;
}
interface GetBuyOrdersParams extends PaginationParams {
    name?: string;
}
interface PlaceBuyOrderItemInput {
    itemId: number;
    price: number;
    amount: number;
    keepActive: boolean;
}
interface PlaceBuyOrdersParams {
    items: PlaceBuyOrderItemInput[];
}
interface UpdateGroupedBuyOrderInput {
    itemId: number;
    amount: number;
    active: boolean;
    price: number;
    newPrice: number;
    keepActive: boolean;
    newKeepActive: boolean;
}
interface UpdateGroupedBuyOrdersParams {
    orders: UpdateGroupedBuyOrderInput[];
}
interface CancelGroupedBuyOrderInput {
    itemId: number;
    amount: number;
    active: boolean;
    price: number;
}
interface CancelGroupedBuyOrdersParams {
    orders: CancelGroupedBuyOrderInput[];
}

declare function initBuyOrdersModule(client: RustSkinsClient): {
    getBuyOrdersData(params?: GetBuyOrdersDataParams): Promise<BuyOrdersDataItem[]>;
    getBuyOrders(params?: GetBuyOrdersParams): Promise<GroupedBuyOrder[]>;
    createBuyOrders(params: PlaceBuyOrdersParams): Promise<any>;
    updateBuyOrders(params: UpdateGroupedBuyOrdersParams): Promise<any>;
    cancelBuyOrders(params: CancelGroupedBuyOrdersParams): Promise<any>;
    cancelAllBuyOrders(): Promise<any>;
};

interface RustSkinsUser {
    id: number;
    email: string | null;
    tradeUrl: string | null;
    steamId: string;
    balance: number;
}
interface Trade {
    id: number;
    steamTradeId: string | null;
    state: TradeState;
}
interface Referral {
    steamId: string;
    totalDeposited: number;
}
interface UpdateUserParams {
    tradeUrl?: string | null;
    email?: string | null;
}
interface GetTradesParams extends PaginationParams {
}
interface GetReferralsParams extends PaginationParams {
}
interface CheckReferralParams {
    steamId: string;
}

declare function initUserModule(client: RustSkinsClient): {
    getUser(): Promise<RustSkinsUser>;
    updateUser(params: UpdateUserParams): Promise<RustSkinsUser>;
    getTrades(params?: GetTradesParams): Promise<Trade[]>;
    getReferrals(params?: GetReferralsParams): Promise<Referral[]>;
    checkReferral(params: CheckReferralParams): Promise<boolean>;
};

interface SteamItemType {
    id: number;
    appId: number | null;
    image: string | null;
    name: string;
    steamPrice: number | null;
}
interface ItemBuyOrder {
    id: number;
    itemId: number;
    name: string;
    price: number;
    state: BuyOrderState;
    yours: boolean;
}
interface ItemListing {
    id: number;
    amount: number;
    price: number;
    name: string;
    classid: string | null;
    yours: boolean;
}
interface ItemRecentSale {
    id: number;
    itemId: number;
    name: string;
    amount: number;
    price: number;
    date: string;
}
interface SearchItemsParams extends PaginationParams {
    name?: string;
    appId?: number;
}
interface GetItemBuyOrdersParams extends PaginationParams {
    id: number;
}
interface GetItemListingsParams extends PaginationParams {
    id: number;
}
interface GetItemRecentSalesParams extends PaginationParams {
    id: number;
}

declare function initItemsModule(client: RustSkinsClient): {
    searchItems(params?: SearchItemsParams): Promise<SteamItemType[]>;
    getItemBuyOrders(params: GetItemBuyOrdersParams): Promise<ItemBuyOrder[]>;
    getItemListings(params: GetItemListingsParams): Promise<ItemListing[]>;
    getItemRecentSales(params: GetItemRecentSalesParams): Promise<ItemRecentSale[]>;
};

interface InstantSalePriceItem {
    id: number;
    appId: number | null;
    contextId: string | null;
    name: string;
    price: number;
    amount: number;
}
interface InstantSaleInventoryItem {
    assetid: string;
    appid: number;
    contextid: string;
    amount: number;
    name: string;
    classid: string | null;
    steamPrice: number | null;
    instantSalePrice: number;
}
interface InstantSaleInventory {
    username: string;
    avatar: string;
    steamId: string;
    availableItems: InstantSaleInventoryItem[];
    unavailableItems: InstantSaleInventoryItem[];
}
interface InstantSaleItem {
    id: number;
    price: number;
    name: string;
    amount: number;
}
interface GetInstantSalePricesParams extends PaginationParams {
    name?: string;
    appId?: number;
}
interface SteamDepositItem {
    assetid: string;
    appid: number;
    contextid: string;
    amount: number;
    priceToList?: number | null;
    instantSalePrice?: number | null;
}
interface InstantSellSteamParams {
    items: SteamDepositItem[];
    type: InstantSalePayoutType;
    currency?: CryptoCurrency | null;
    network?: CryptoNetwork | null;
    address?: string | null;
    destinationTag?: string | null;
    email?: string | null;
}
interface InventoryInstantSellItemInput {
    itemId: number;
    amount: number;
    instantSellPrice: number;
}
interface InventoryInstantSellParams {
    items: InventoryInstantSellItemInput[];
}
interface MarketInstantSellItemInput {
    itemId: number;
    amount: number;
    price: number;
    sellerFeePerItem: number;
    pricingStrategy: string | null;
    updateInterval: string | null;
    stopPrice: number | null;
    instantSellPrice: number;
}
interface MarketInstantSellListingsParams {
    listings: MarketInstantSellItemInput[];
}

declare function initInstantSaleModule(client: RustSkinsClient): {
    getPrices(params?: GetInstantSalePricesParams): Promise<InstantSalePriceItem[]>;
    getSteamInventory(): Promise<InstantSaleInventory>;
    instantSellSteam(params: InstantSellSteamParams): Promise<any>;
    instantSellInventory(params: InventoryInstantSellParams): Promise<InstantSaleItem[]>;
    instantSellListings(params: MarketInstantSellListingsParams): Promise<InstantSaleItem[]>;
};

interface PriceComparisonItem {
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
interface GetPriceComparisonParams extends PaginationParams {
    name?: string;
    appId?: number;
}

declare function initPriceComparisonModule(client: RustSkinsClient): {
    getPriceComparison(params?: GetPriceComparisonParams): Promise<PriceComparisonItem[]>;
};

export { type BuyMarketplaceItemInput, type BuyMarketplaceItemsParams, type BuyOrder, type BuyOrderState, type BuyOrdersDataItem, type CancelGroupedBuyOrderInput, type CancelGroupedBuyOrdersParams, type CheckReferralParams, type CryptoCurrency, type CryptoNetwork, type DelistGroupedListingInput, type DelistGroupedListingsParams, type GetBuyOrdersDataParams, type GetBuyOrdersParams, type GetInstantSalePricesParams, type GetItemBuyOrdersParams, type GetItemListingsParams, type GetItemRecentSalesParams, type GetListingsParams, type GetMarketplaceDataParams, type GetPriceComparisonParams, type GetPurchasesParams, type GetReferralsParams, type GetSalesParams, type GetTradesParams, type GroupedBuyOrder, type GroupedInventoryItem, type GroupedListing, type InstantSaleInventory, type InstantSaleInventoryItem, type InstantSaleItem, type InstantSalePayoutType, type InstantSalePriceItem, type InstantSellSteamParams, type InventoryInstantSellItemInput, type InventoryInstantSellParams, type InventoryItem, type ItemBuyOrder, type ItemListing, type ItemRecentSale, type ListGroupedItemInput, type ListGroupedItemsParams, type MarketInstantSellItemInput, type MarketInstantSellListingsParams, type MarketplaceDataItem, type MarketplaceDataItemLocked, type MarketplaceItem, type MarketplaceOrderDirection, type MarketplaceTransaction, type PaginationParams, type PlaceBuyOrderItemInput, type PlaceBuyOrdersParams, type PriceComparisonItem, type Referral, type RequestSteamDepositItem, type ResellMarketplaceItemsParams, RustSkinsClient, type RustSkinsClientOptions, RustSkinsSDK, type RustSkinsUser, type SearchItemsParams, type SearchMarketplaceParams, type SellSteamItemsParams, type SteamDepositItem, type SteamInventoryItemV2, type SteamItemPriceSuggestions, type SteamItemType, type Trade, type TradeState, type UpdateGroupedBuyOrderInput, type UpdateGroupedBuyOrdersParams, type UpdateGroupedListingInput, type UpdateGroupedListingPricingStrategyInput, type UpdateGroupedListingsParams, type UpdateGroupedListingsPricingStrategyParams, type UpdateUserParams, type WithdrawGroupedItemInput, type WithdrawGroupedItemsParams, initBuyOrdersModule, initInstantSaleModule, initInventoryModule, initItemsModule, initListingsModule, initMarketplaceModule, initPriceComparisonModule, initUserModule };
