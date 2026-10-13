import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { captureMetaAttribution, normalizeMetaAttribution } from '../src/utils/meta-attribution.ts';
import { deriveAcquisitionChannel, handleAttribution, selectClickId } from '../src/server/routes/ads/webhooks.ts';

test('Meta identifiers require consent and cannot enter Google fields',()=>{
 const {window}=new JSDOM('',{url:'https://www.senna-automation.com/ads/test?fbclid=real_click'});
 window.document.cookie='_fbp=fb.1.1791900000000.123456';
 assert.deepEqual(captureMetaAttribution(window,false),{});
 const value=captureMetaAttribution(window,true);
 assert.equal(value.fbclid,'real_click');
 assert.match(value.fbc,/^fb\.1\.\d{13}\.real_click$/);
 assert.equal(value.fbp,'fb.1.1791900000000.123456');
 assert.equal(selectClickId({fbclid:'real_click',clickIdType:'fbclid',clickId:'real_click'}),null);
 assert.deepEqual(normalizeMetaAttribution({fbc:'bad',fbp:'bad',fbclid:'token?private'},true),{});
 assert.equal(deriveAcquisitionChannel({utm_source:'facebook',utm_medium:'paid_social'},null),'paid_social');
 assert.equal(deriveAcquisitionChannel({utm_source:'facebook',utm_medium:'social'},null),'social');
 assert.equal(deriveAcquisitionChannel({utm_source:'google',utm_medium:'cpc'},{type:'gclid',value:'click'}),'paid_search');
});

test('Signed persistence removes Meta data on denied consent and exclusion',async()=>{
 const originalFetch=globalThis.fetch;
 const oldUrl=process.env.ADS_ATTRIBUTION_WEBHOOK_URL;
 const oldSecret=process.env.ADS_WEBHOOK_SIGNING_SECRET;
 process.env.ADS_ATTRIBUTION_WEBHOOK_URL='https://example.org/intake';
 process.env.ADS_WEBHOOK_SIGNING_SECRET='test-only-secret';
 const received=[];
 globalThis.fetch=async(_url,options)=>{received.push(JSON.parse(options.body));return new Response('{}',{status:202});};
 try {
  for(const [marketing,excluded] of [['denied',false],['granted',true],['granted',false]]){
   const response=await handleAttribution(new Request('https://www.senna-automation.com/api/attribution',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({attributionId:'attr_12345678-1234-4234-9234-123456789abc',consent:{marketing,version:2},analyticsExcluded:excluded,firstTouch:{metaAttribution:{fbclid:'real_click'}},lastTouch:{metaAttribution:{fbclid:'real_click'}}})}));
   assert.equal(response.status,202);
  }
  assert.deepEqual(received[0].lastTouch.metaAttribution,{});
  assert.deepEqual(received[1].lastTouch.metaAttribution,{});
  assert.deepEqual(received[2].lastTouch.metaAttribution,{fbclid:'real_click'});
 } finally {globalThis.fetch=originalFetch; if(oldUrl===undefined)delete process.env.ADS_ATTRIBUTION_WEBHOOK_URL;else process.env.ADS_ATTRIBUTION_WEBHOOK_URL=oldUrl; if(oldSecret===undefined)delete process.env.ADS_WEBHOOK_SIGNING_SECRET;else process.env.ADS_WEBHOOK_SIGNING_SECRET=oldSecret;}
});
