import { HttpClient } from '@benji/stdlib/http.js';
import type { HttpResponse } from '@benji/stdlib/http.js';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';

export interface RustSkinsClientOptions {
  apiKey: string;
  projectId?: number;
  baseUrl?: string;
  proxy?: string;
}

const DEFAULT_BASE_URL = 'https://api.rustskins.com';
const SDK_VERSION = '1.0.0';

export class RustSkinsClient {
  private readonly http: HttpClient;
  private readonly baseUrl: string;
  private readonly proxyAgents?: { http?: any; https?: any };
  public readonly projectId: number | undefined;

  constructor({ apiKey, projectId, baseUrl = DEFAULT_BASE_URL, proxy }: RustSkinsClientOptions) {
    this.projectId = projectId;
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    const httpOptions: any = {
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'User-Agent': `RustSkinsSDK/${SDK_VERSION} (+https://rustskins.com)`,
        'Authorization': `Bearer ${apiKey}`,
      },
    };

    if (proxy) {
      let proxyUrl = proxy;

      if (!proxy.startsWith('http://') && !proxy.startsWith('https://') && !proxy.startsWith('socks5://')) {
        proxyUrl = `socks5://${proxy}`;
      }

      if (proxyUrl.startsWith('socks5://')) {
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

  destroy(): void {
    try {
      this.proxyAgents?.http?.destroy?.();
    } finally {
      this.proxyAgents?.https?.destroy?.();
    }
  }

  private normalizePath(path: string): string {
    return path.replace(/^\/+/, '');
  }

  private buildUrl(path: string, query?: Record<string, any>): string {
    const cleanPath = this.normalizePath(path);
    const url = new URL(cleanPath, this.baseUrl);

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      }
    }

    return url.toString();
  }

  private assertOk(response: HttpResponse): void {
    if (response.statusCode < 200 || response.statusCode >= 300) {
      const body = (response as HttpResponse & { jsonBody?: unknown }).jsonBody;
      throw new Error(
        `RustSkins API error ${response.statusCode}: ${JSON.stringify(body)}`,
      );
    }
  }

  async get<T = any>(path: string, query?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(path, query);

    const response = await this.http.request({
      method: 'GET',
      url,
    });

    this.assertOk(response);
    return (response as HttpResponse & { jsonBody?: T }).jsonBody as T;
  }

  async post<T = any>(path: string, body?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(path);

    const response = await this.http.request({
      method: 'POST',
      url,
      json: body as Record<string, any>,
    });

    this.assertOk(response);
    return (response as HttpResponse & { jsonBody?: T }).jsonBody as T;
  }

  async patch<T = any>(path: string, body?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(path);

    const response = await this.http.request({
      method: 'PATCH',
      url,
      json: body as Record<string, any>,
    });

    this.assertOk(response);
    return (response as HttpResponse & { jsonBody?: T }).jsonBody as T;
  }

  async delete<T = any>(path: string, body?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(path);

    const response = await this.http.request({
      method: 'DELETE',
      url,
      json: body as Record<string, any>,
    });

    this.assertOk(response);
    return (response as HttpResponse & { jsonBody?: T }).jsonBody as T;
  }
}
