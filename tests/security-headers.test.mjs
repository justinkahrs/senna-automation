import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
const universalRule = config.headers.find((rule) => rule.source === '/(.*)');
const headerMap = new Map((universalRule?.headers ?? []).map(({ key, value }) => [key.toLowerCase(), value]));

test('global response headers include the reviewed report-only policy and browser protections', () => {
  assert.ok(universalRule, 'the policy applies to all website routes');
  assert.equal(headerMap.get('x-content-type-options'), 'nosniff');
  assert.equal(headerMap.get('x-frame-options'), 'DENY');
  assert.equal(headerMap.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.equal(headerMap.get('permissions-policy'), 'camera=(), microphone=(), geolocation=()');

  const csp = headerMap.get('content-security-policy-report-only');
  assert.ok(csp, 'CSP remains report-only during compatibility review');
  const directives = new Map(csp.split(';').map((part) => {
    const [name, ...values] = part.trim().split(/\s+/);
    return [name, values.join(' ')];
  }));
  assert.equal(directives.get('default-src'), "'self'");
  assert.equal(directives.get('base-uri'), "'self'");
  assert.equal(directives.get('object-src'), "'none'");
  assert.equal(directives.get('frame-ancestors'), "'none'");
  assert.equal(directives.get('form-action'), "'self'");
  assert.doesNotMatch(csp, /\*|unsafe-inline|unsafe-eval/);
  assert.doesNotMatch(csp, /Content-Security-Policy(?!-Report-Only)/);
});
