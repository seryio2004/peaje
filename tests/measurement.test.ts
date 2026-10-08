import assert from "node:assert/strict";
import test from "node:test";
import { createGameAnalytics } from "../lib/game-analytics";
import { startGame } from "../lib/game";
import { siteConfig, canLoadCloudflareAnalytics } from "../lib/config";
import { EVENT_NAMES, trackEvent, registerAnalyticsAdapter, clearAnalyticsSession, ANALYTICS_SESSION_KEY, type AnalyticsEvent, type EventProperties } from "../lib/analytics";
import { saveConsent, isConsent, getConsentPolicy, CONSENT_MAX_AGE_MS } from "../lib/consent";
import { readStored, writeStored, removeStored } from "../lib/storage";
import { QUESTION_CATALOG, MODE_IDS, CATEGORY_IDS } from "../lib/game-catalog";
import { createAnalyticsId } from "../lib/analytics-id";

test("games start without randomUUID, and unavailable crypto only disables measurement", () => {
 const originalCrypto = Object.getOwnPropertyDescriptor(globalThis, "crypto");
 const getRandomValues = globalThis.crypto.getRandomValues.bind(globalThis.crypto);
 const events: { name: string; props?: EventProperties }[] = [];
 const game = startGame("one-player");
 const tracker = createGameAnalytics((name, props) => { events.push({name, props}); return true; });
 try {
  Object.defineProperty(globalThis, "crypto", {configurable:true, value:{getRandomValues}});
  assert.doesNotThrow(() => tracker.start(game));
  tracker.update({...game, phase:"complete", endReason:"route-completed"});
  tracker.start(game, "repeat");
  assert.deepEqual(events.map(e => e.name), ["game_start", "game_end", "game_repeat", "game_start"]);
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  assert.match(events[0].props!.game_id!, uuidPattern);
  assert.match(events[3].props!.game_id!, uuidPattern);
  assert.notEqual(events[0].props?.game_id, events[3].props?.game_id);
  for (const crypto of [undefined, {}, {getRandomValues(){throw new Error("unavailable");}}]) {
   Object.defineProperty(globalThis, "crypto", {configurable:true, value:crypto});
   assert.equal(createAnalyticsId(), null);
   assert.doesNotThrow(() => tracker.start(game));
   tracker.update({...game, phase:"complete"});
   tracker.abandon("navigation");
   tracker.share("native");
   assert.equal(events.length, 4);
  }
 } finally {
  if (originalCrypto) Object.defineProperty(globalThis, "crypto", originalCrypto);
  else Reflect.deleteProperty(globalThis, "crypto");
 }
});

test("measurement errors never interrupt game actions", () => {
 let broken = false;
 const tracker = createGameAnalytics(() => { if (broken) throw new Error("offline"); return true; });
 const game = startGame("one-player");
 tracker.start(game);
 broken = true;
 assert.doesNotThrow(() => tracker.share("native"));
 assert.doesNotThrow(() => tracker.update({...game, phase:"complete"}));
 assert.doesNotThrow(() => tracker.start(game, "repeat"));
 broken = false;
 tracker.start(game);
 broken = true;
 assert.doesNotThrow(() => tracker.abandon("navigation"));
 assert.doesNotThrow(() => tracker.start(game));
});

test("stable catalog IDs are unique and no skipping event exists", () => {
 for (const ids of [Object.values(QUESTION_CATALOG).map(q => q.id), Object.values(MODE_IDS), Object.values(CATEGORY_IDS)]) assert.equal(new Set(ids).size, ids.length);
 assert.deepEqual(EVENT_NAMES, ["game_start", "game_end", "game_abandon", "game_repeat", "game_share"]);
});
test("game lifecycle deduplicates completion and abandonment; repeats get a new ID", () => {
 const events: { name: string; props?: EventProperties }[] = [];
 let time = 100;
 const tracker = createGameAnalytics((name, props) => { events.push({name,props}); return true; }, () => time);
 const game = startGame({mode:"one-player", variant:"classic", difficulty:"easy"});
 tracker.start(game);
 time = 600;
 tracker.update({...game, phase:"complete", endReason:"route-completed"});
 tracker.update({...game, phase:"complete", endReason:"route-completed"});
 tracker.abandon("navigation");
 tracker.share("clipboard");
 tracker.start(game, "repeat");
 tracker.abandon("new_game");
 tracker.abandon("page_exit");
 assert.deepEqual(events.map(e=>e.name), ["game_start","game_end","game_share","game_repeat","game_start","game_abandon"]);
 assert.equal(events[1].props?.duration_ms, 500);
 assert.equal(events[4].props?.previous_game_id, events[0].props?.game_id);
 assert.notEqual(events[4].props?.game_id, events[0].props?.game_id);
});
test("untracked or forgotten games produce no orphan events", () => {
 const events: string[] = [];
 const tracker = createGameAnalytics((name) => {events.push(name); return false;});
 const game = startGame({mode:"one-player", variant:"classic", difficulty:"easy"});
 tracker.start(game); tracker.update({...game,phase:"complete"}); tracker.abandon("navigation"); tracker.share("native");
 assert.deepEqual(events, ["game_start"]);
 const tracked = createGameAnalytics(name => {events.push(name); return true;});
 tracked.start(game); tracked.forget(); tracked.update({...game,phase:"complete"}); tracked.share("native");
 assert.deepEqual(events, ["game_start","game_start"]);
});
test("consent rejects old versions, expired and future records", () => {
 const base = {version:2,policy:getConsentPolicy(),necessary:true,analytics:true,advertising:false,updatedAt:Date.now()};
 assert.equal(isConsent(base), true);
 for (const patch of [{version:1},{policy:"old"},{advertising:true},{analytics:"true"},{updatedAt:Date.now()-CONSENT_MAX_AGE_MS},{updatedAt:Date.now()+60000}]) assert.equal(isConsent({...base,...patch}),false);
});
test("storage failure, consent gates, session counts and adapter isolation", () => {
 const local = new Map<string,string>(), session = new Map<string,string>();
 const storage = (map: Map<string,string>) => ({getItem:(k:string)=>map.get(k)??null,setItem:(k:string,v:string)=>map.set(k,v),removeItem:(k:string)=>map.delete(k)});
 const target = new EventTarget();
 const originalWindow = Object.getOwnPropertyDescriptor(globalThis,"window");
 const originalCrypto = Object.getOwnPropertyDescriptor(globalThis,"crypto");
 const getRandomValues = globalThis.crypto.getRandomValues.bind(globalThis.crypto);
 const originalConfig = {...siteConfig};
 Object.defineProperty(globalThis,"window",{configurable:true,value:Object.assign(target,{localStorage:storage(local),sessionStorage:storage(session)})});
 const received: AnalyticsEvent[] = [];
 const offBroken = registerAnalyticsAdapter(()=>{throw new Error("offline");});
 const off = registerAnalyticsAdapter(e=>received.push(e));
 try {
  Object.defineProperty(globalThis,"crypto",{configurable:true,value:{getRandomValues}});
  Object.assign(siteConfig, { analyticsEnabled: false }); Object.assign(siteConfig, { analyticsDebug: false });
  saveConsent({analytics:true,advertising:false});
  assert.equal(trackEvent("game_start"),false); assert.equal(session.size,0);
  Object.assign(siteConfig, { analyticsEnabled: true });
  saveConsent({analytics:false,advertising:true});
  assert.equal(trackEvent("game_start"),false); assert.equal(session.size,0);
  saveConsent({analytics:true,advertising:false});
  assert.equal(trackEvent("game_start",{game_id:"game-1",score:NaN,question_id:"contains private text"}),true);
  trackEvent("game_start");
  assert.equal(received.length,2);
  assert.equal(received[1].properties.session_game_number,2);
  assert.equal(received[0].session_id,received[1].session_id);
  assert.equal(received[0].properties.score,undefined);
  assert.equal(received[0].properties.question_id,undefined);
  saveConsent({analytics:false,advertising:false});
  assert.equal(trackEvent("game_end"),false);
  clearAnalyticsSession(); assert.equal(session.has(ANALYTICS_SESSION_KEY),false);
  local.set("broken","{");
  assert.equal(readStored("broken",(v):v is string=>typeof v==="string"),null);
  Object.defineProperty(window,"localStorage",{configurable:true,get(){throw new Error("blocked");}});
  assert.equal(writeStored("x",1),false);
  assert.doesNotThrow(()=>removeStored("x"));
  saveConsent({analytics:true,advertising:false});
  assert.equal(trackEvent("game_start"),true); // Memory fallback still works.
  assert.notEqual(received[2].session_id,received[0].session_id);
  clearAnalyticsSession();
  Object.defineProperty(globalThis,"crypto",{configurable:true,value:undefined});
  assert.equal(trackEvent("game_start"),false);
  assert.equal(received.length,3);
  Object.assign(siteConfig, { cloudflareEnabled: true }); Object.assign(siteConfig, { cloudflareToken: "invalid" });
  assert.equal(canLoadCloudflareAnalytics(true),false);
  Object.assign(siteConfig, { cloudflareToken: "a".repeat(32) });
  assert.equal(canLoadCloudflareAnalytics(false),false);
  assert.equal(canLoadCloudflareAnalytics(true),true);
 } finally {
  off();offBroken();clearAnalyticsSession();Object.assign(siteConfig,originalConfig);
  if (originalWindow) Object.defineProperty(globalThis,"window",originalWindow); else Reflect.deleteProperty(globalThis,"window");
  if (originalCrypto) Object.defineProperty(globalThis,"crypto",originalCrypto); else Reflect.deleteProperty(globalThis,"crypto");
 }
});
