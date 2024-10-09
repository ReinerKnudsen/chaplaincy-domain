import * as universal from '../entries/pages/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/4.BalJBPuX.js","_app/immutable/chunks/firebaseConfig.hXLAg77p.js","_app/immutable/chunks/index-219c3cac.UombHsWy.js","_app/immutable/chunks/scheduler.NTvg1yRH.js","_app/immutable/chunks/index.BFVs8E14.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/Icon.DzyQmyFx.js","_app/immutable/chunks/ItemCard.CeEKMuPq.js"];
export const stylesheets = ["_app/immutable/assets/4.NDmnxdZ0.css"];
export const fonts = [];
