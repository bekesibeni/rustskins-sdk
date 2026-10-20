import got from 'got';
import type { Got, Response } from 'got';
import { Agent as NodeHttpAgent } from 'node:http';
import type { Agent as HttpAgent } from 'node:http';
import { Agent as NodeHttpsAgent } from 'node:https';
import type { Agent as HttpsAgent } from 'node:https';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { RustSkinsApiError } from './errors.js';

export interface RustSkinsClientOptions {
  apiKey: string;
  projectId?: number;
  baseUrl?: string;
  timeout?: number;
  /** `socks5://`, `http://` or `https://` proxy URL; a bare `host:port` is treated as SOCKS5. */
  proxy?: string;
}

export const DEFAULT_BASE_URL = 'https://api.rustskins.com';
const DEFAULT_TIMEOUT_MS = 30_000;
const SDK_VERSION = '1.1.0';

type QueryValue = string | number | boolean | null | undefined;
export type Query = Record<string, QueryValue>;
export type Body = Record<string, unknown>;
type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface Agents {
  http: HttpAgent;
  https: HttpsAgent;
}

export class RustSkinsClient {
  readonly baseUrl: string;
  readonly projectId: number | undefined;
  private readonly http: Got;
  private readonly agents: Agents;
  private readonly timeout: number;

  constructor({ apiKey, projectId, baseUrl = DEFAULT_BASE_URL, timeout = DEFAULT_TIMEOUT_MS, proxy }: RustSkinsClientOptions) {
    if (!apiKey) throw new Error('RustSkinsClient: apiKey is required');
    this.projectId = projectId;
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    this.timeout = timeout;
    this.agents = proxy ? buildProxyAgents(proxy) : buildDirectAgents();

    this.http = got.extend({
      prefixUrl: this.baseUrl,
      headers: {
        accept: 'application/json',
        'user-agent': `rustskins-sdk/${SDK_VERSION} (+https://github.com/bekesibeni/rustskins-sdk)`,
        authorization: `Bearer ${apiKey}`,
      },
      agent: { http: this.agents.http, https: this.agents.https },
      responseType: 'json',
      throwHttpErrors: false,
      followRedirect: false,
      // Never resend: a replayed purchase POST buys twice.
      retry: { limit: 0 },
    });
  }

  destroy(): void {
    try {
      this.agents.http.destroy();
    } finally {
      this.agents.https.destroy();
    }
  }

  async get<T>(path: string, query?: Query): Promise<T> {
    return unwrap<T>(await this.send('GET', path, { query }));
  }

  async post<T>(path: string, body?: Body): Promise<T> {
    return unwrap<T>(await this.send('POST', path, { body }));
  }

  async patch<T>(path: string, body?: Body): Promise<T> {
    return unwrap<T>(await this.send('PATCH', path, { body }));
  }

  async delete<T>(path: string, body?: Body): Promise<T> {
    return unwrap<T>(await this.send('DELETE', path, { body }));
  }

  private send(method: Method, path: string, options: { query?: Query | undefined; body?: Body | undefined }): Promise<Response<unknown>> {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(options.query ?? {})) {
      if (value !== undefined && value !== null) searchParams.append(key, String(value));
    }
    return this.http(path.replace(/^\/+/, ''), {
      method,
      searchParams,
      timeout: { request: this.timeout },
      ...(options.body ? { json: options.body } : {}),
    });
  }
}

function unwrap<T>(response: Response<unknown>): T {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new RustSkinsApiError(response.statusCode, response.body ?? null, parseRetryAfter(response.headers['retry-after']));
  }
  return response.body as T;
}

function parseRetryAfter(value: string | string[] | undefined): number | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;
  const seconds = Number(raw);
  if (Number.isFinite(seconds)) return Math.max(0, seconds);
  const at = Date.parse(raw);
  return Number.isFinite(at) ? Math.max(0, Math.ceil((at - Date.now()) / 1000)) : null;
}

function buildDirectAgents(): Agents {
  return { http: new NodeHttpAgent({ keepAlive: true }), https: new NodeHttpsAgent({ keepAlive: true }) };
}

function buildProxyAgents(proxy: string): Agents {
  const proxyUrl = /^(https?|socks5h?):\/\//.test(proxy) ? proxy : `socks5://${proxy}`;
  if (proxyUrl.startsWith('socks5')) {
    return { http: new SocksProxyAgent(proxyUrl), https: new SocksProxyAgent(proxyUrl) };
  }
  return { http: new HttpProxyAgent(proxyUrl), https: new HttpsProxyAgent(proxyUrl) };
}
