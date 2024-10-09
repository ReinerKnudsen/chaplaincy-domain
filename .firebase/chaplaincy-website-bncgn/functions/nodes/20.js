import * as server from '../entries/pages/(pages)/activities/_page.server.js';

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(pages)/activities/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(pages)/activities/+page.server.js";
export const imports = ["_app/immutable/nodes/20.v4LPoUNq.js","_app/immutable/chunks/scheduler.NTvg1yRH.js","_app/immutable/chunks/index.BFVs8E14.js"];
export const stylesheets = [];
export const fonts = [];
