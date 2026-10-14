import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {JSDOM} from 'jsdom';

const analyticsSource = readFileSync(new URL('../src/utils/analytics.ts', import.meta.url),'utf8');
const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro',import.meta.url),'utf8');
const loader = (name) => layout.split(`<script is:inline define:vars={{ ${name} }}>`)[1].split('</script>')[0];
function fixture(consent,excluded=false){
 const dom=new JSDOM('<html><head></head></html>',{url:'https://www.senna-automation.com/',runScripts:'outside-only'});
 const w=dom.window;
 if(consent) w.localStorage.setItem('senna_consent_v1',JSON.stringify(consent));
 if(excluded) w.localStorage.setItem('senna_analytics_excluded_v1','true');
 w.googleAdsId='AW-test';w.umamiWebsiteId='test';
 return dom;
}

test('Optional script loaders require current explicit consent and honor owner exclusion',()=>{
 for(const consent of [null,{version:2,marketing:'denied',analytics:'denied'},{version:1,marketing:'granted',analytics:'granted'}]){
  const dom=fixture(consent); const w=dom.window;
  w.eval(loader('googleAdsId'));w.eval(loader('umamiWebsiteId'));
  w.__sennaLoadGoogleAds();w.__sennaLoadUmami();
  assert.equal(w.document.querySelectorAll('script[src]').length,0);
  dom.window.close();
 }
 for(const excluded of [false,true]){
  const dom=fixture({version:2,marketing:'granted',analytics:'granted'},excluded);
  const w=dom.window;w.eval(loader('googleAdsId'));w.eval(loader('umamiWebsiteId'));
  assert.equal(w.document.querySelectorAll('script[src]').length,excluded?0:2);
  w.__sennaLoadGoogleAds();w.__sennaLoadUmami();
  assert.equal(w.document.querySelectorAll('script[src]').length,excluded?0:2);
  dom.window.close();
 }
});

test('Form conversions and Umami events stop after consent withdrawal, legacy consent or exclusion',()=>{
 const dom=fixture({version:2,marketing:'granted',analytics:'granted'});
 const w=dom.window; const calls=[];
 w.umami={track:()=>calls.push('umami')};w.gtag=()=>calls.push('google');w.__sennaLoadGoogleAds=()=>calls.push('loader');
 const context=vm.createContext({window:w,document:w.document,URLSearchParams,console,getConsentState:()=>JSON.parse(w.localStorage.getItem('senna_consent_v1')||'{}'),isAnalyticsExcluded:()=>w.localStorage.getItem('senna_analytics_excluded_v1')==='true'});
 const code=ts.transpileModule(analyticsSource.replace(/^import .* from "\.\/consent";$/m,'').replaceAll('import.meta.env.DEV','false').replaceAll('import.meta.env.PUBLIC_GOOGLE_ADS_ID','"AW-test"').replaceAll('import.meta.env.PUBLIC_GOOGLE_LEAD_CONVERSION_LABEL','"label"').replace(/^export /gm,''),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText.replace(/export \{\};?/g,'');
 vm.runInContext(code,context);
 const run=()=>vm.runInContext('trackEvent("QA");trackGoogleLeadConversion("qa-transaction")',context);
 run();assert.deepEqual(calls,['umami','loader','google']);calls.length=0;
 for(const consent of [{version:2,marketing:'denied',analytics:'denied'},{version:1,marketing:'granted',analytics:'granted'},{}]){
  w.localStorage.setItem('senna_consent_v1',JSON.stringify(consent));run();assert.deepEqual(calls,[]);
 }
 w.localStorage.setItem('senna_consent_v1',JSON.stringify({version:2,marketing:'granted',analytics:'granted'}));
 w.localStorage.setItem('senna_analytics_excluded_v1','true');run();assert.deepEqual(calls,[]);
 dom.window.close();
});
