import * as server from '../entries/pages/(pages)/groups/_page.server.js';

export const index = 23;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(pages)/groups/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(pages)/groups/+page.server.js";
export const imports = ["_app/immutable/nodes/23.DrBvNpjM.js","_app/immutable/chunks/scheduler.NTvg1yRH.js","_app/immutable/chunks/index.BFVs8E14.js","_app/immutable/chunks/PageHeader.xAFLIwds.js"];
export const stylesheets = ["_app/immutable/assets/23.Cczu2W1q.css"];
export const fonts = [];
