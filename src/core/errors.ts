export class RustSkinsApiError extends Error {
  readonly status: number;
  readonly body: unknown;
  readonly retryAfterSec: number | null;

  constructor(status: number, body: unknown, retryAfterSec: number | null = null) {
    super(`RustSkins API error ${status}: ${JSON.stringify(body)}`);
    this.name = 'RustSkinsApiError';
    this.status = status;
    this.body = body;
    this.retryAfterSec = retryAfterSec;
  }

  get isRateLimited(): boolean {
    return this.status === 429;
  }

  get isRetryable(): boolean {
    return this.status === 408 || this.status === 429 || this.status >= 500;
  }
}
