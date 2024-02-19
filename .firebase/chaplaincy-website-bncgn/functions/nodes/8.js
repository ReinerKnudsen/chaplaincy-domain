import * as server from '../entries/pages/groups/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/groups/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/groups/+page.server.js";
export const imports = ["_app/immutable/nodes/8.yjP6LCri.js","_app/immutable/chunks/scheduler.8in3qj-x.js","_app/immutable/chunks/index.bjd3BJJv.js"];
export const stylesheets = [];
export const fonts = [];
