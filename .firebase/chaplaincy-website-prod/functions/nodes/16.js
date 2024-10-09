import * as server from '../entries/pages/(pages)/about/_page.server.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(pages)/about/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(pages)/about/+page.server.js";
export const imports = ["_app/immutable/nodes/16.BSpNVobt.js","_app/immutable/chunks/scheduler.B2j_u3VX.js","_app/immutable/chunks/index.gBPXUQn8.js"];
export const stylesheets = ["_app/immutable/assets/16.qLyZeenk.css"];
export const fonts = [];
