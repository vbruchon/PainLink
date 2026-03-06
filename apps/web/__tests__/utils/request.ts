export function makeJsonRequest(opts: {
  url?: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body: unknown;
}) {
  return new Request(opts.url ?? 'http://localhost', {
    method: opts.method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(opts.body),
  });
}

export function makeInvalidJsonRequest(opts: { url?: string; method: 'POST' | 'PATCH' | 'PUT' }) {
  return new Request(opts.url ?? 'http://localhost', {
    method: opts.method,
    headers: { 'content-type': 'application/json' },
    body: '{invalid-json',
  });
}
