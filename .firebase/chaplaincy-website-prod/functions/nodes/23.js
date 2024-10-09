import * as server from '../entries/pages/(pages)/groups/_page.server.js';

export const index = 23;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(pages)/groups/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(pages)/groups/+page.server.js";
export const imports = ["_app/immutable/nodes/23.BhA1wEap.js","_app/immutable/chunks/scheduler.B2j_u3VX.js","_app/immutable/chunks/index.gBPXUQn8.js","_app/immutable/chunks/PageHeader.D7aM7TKc.js"];
export const stylesheets = ["_app/immutable/assets/23.Cczu2W1q.css"];
export const fonts = [];
