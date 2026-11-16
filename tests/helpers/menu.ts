import { readFileSync } from 'node:fs';

type MenuItem = { title: string; url?: string; active?: boolean; subMenu?: MenuItem[] };
export type NavLink = { title: string; url: string; parent?: string };

const { menu } = JSON.parse(readFileSync('src/lib/data/menu.json', 'utf8')) as { menu: MenuItem[] };

/** All links the navigation actually renders (active top level + active sub items). */
export const navLinks: NavLink[] = menu
	.filter((item) => item.active)
	.flatMap((item) =>
		item.subMenu?.length
			? item.subMenu.filter((s) => s.active && s.url).map((s) => ({ title: s.title, url: s.url!, parent: item.title }))
			: item.url
				? [{ title: item.title, url: item.url }]
				: []
	);

/** Matches the URL with or without a trailing slash. */
export const urlPattern = (url: string) =>
	new RegExp(url.replace(/\/$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/?$');
