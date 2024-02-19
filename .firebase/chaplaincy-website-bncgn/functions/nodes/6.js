import * as server from '../entries/pages/events/_eventId_/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/_eventId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/events/[eventId]/+page.server.js";
export const imports = ["_app/immutable/nodes/6.Cms_y48w.js","_app/immutable/chunks/scheduler.8in3qj-x.js","_app/immutable/chunks/index.bjd3BJJv.js"];
export const stylesheets = [];
export const fonts = [];
