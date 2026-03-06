import { ApiError } from '@/lib/api/api-error';
import { resolveOpenPainSpikeGuardResult } from '@/features/pain-spike/hooks/open-pain-spike-guard';

describe('resolveOpenPainSpikeGuardResult', () => {
  test('returns allow when no open pain spike exists', () => {
    expect(resolveOpenPainSpikeGuardResult({ hasOpen: false })).toEqual({
      type: 'allow',
    });
  });

  test('returns already-open when a pain spike is already open', () => {
    expect(resolveOpenPainSpikeGuardResult({ hasOpen: true })).toEqual({
      type: 'already-open',
    });
  });

  test('returns network-error on ApiError NETWORK_ERROR', () => {
    const error = new ApiError({
      status: 0,
      code: 'NETWORK_ERROR',
      message: 'Network error',
    });

    expect(resolveOpenPainSpikeGuardResult({ error })).toEqual({
      type: 'network-error',
    });
  });

  test('returns fallback-tabs on unknown error', () => {
    expect(resolveOpenPainSpikeGuardResult({ error: new Error('boom') })).toEqual({
      type: 'fallback-tabs',
    });
  });
});
