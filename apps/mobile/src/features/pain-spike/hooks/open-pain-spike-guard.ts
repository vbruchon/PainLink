import { ApiError } from '@/lib/api/api-error';

export type OpenPainSpikeGuardResult =
  | { type: 'allow' }
  | { type: 'already-open' }
  | { type: 'network-error' }
  | { type: 'fallback-tabs' };

export function resolveOpenPainSpikeGuardResult(input: {
  hasOpen?: boolean;
  error?: unknown;
}): OpenPainSpikeGuardResult {
  if (input.error) {
    if (input.error instanceof ApiError && input.error.code === 'NETWORK_ERROR') {
      return { type: 'network-error' };
    }

    return { type: 'fallback-tabs' };
  }

  if (input.hasOpen) {
    return { type: 'already-open' };
  }

  return { type: 'allow' };
}
