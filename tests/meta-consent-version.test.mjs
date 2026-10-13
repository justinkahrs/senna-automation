import assert from 'node:assert/strict';
import test from 'node:test';
import {JSDOM} from 'jsdom';
import {getConsentState,hasConsentDecision,setConsentState,CONSENT_STORAGE_KEY} from '../src/utils/consent.ts';
test('Existing Google consent requires a renewed disclosure before Meta eligibility',()=>{
 const {window}=new JSDOM('',{url:'https://www.senna-automation.com/'});globalThis.window=window;globalThis.CustomEvent=window.CustomEvent;
 try{
  window.localStorage.setItem(CONSENT_STORAGE_KEY,JSON.stringify({analytics:'granted',marketing:'granted',version:1}));
  assert.equal(getConsentState().marketing,'granted');
  assert.equal(getConsentState().version,1);assert.equal(hasConsentDecision(),false);
  setConsentState({analytics:'granted',marketing:'granted'});
  assert.equal(getConsentState().version,2);assert.equal(hasConsentDecision(),true);
  setConsentState({analytics:'denied',marketing:'denied'});
  assert.equal(getConsentState().marketing,'denied');
 }finally{delete globalThis.window;delete globalThis.CustomEvent;}
});
