import * as server from '../entries/pages/activities/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/activities/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/activities/+page.server.js";
export const imports = ["_app/immutable/nodes/4.pk4QIv31.js","_app/immutable/chunks/scheduler.8in3qj-x.js","_app/immutable/chunks/index.bjd3BJJv.js"];
export const stylesheets = [];
export const fonts = [];
