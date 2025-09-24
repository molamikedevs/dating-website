export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'NearMe',
	description: 'A modern dating app built with Next.js and Hero UI',
	navItems: [
		{
			label: 'Matches',
			href: '/matches',
		},
		{
			label: 'Discover',
			href: '/',
		},
		{
			label: 'Chats',
			href: '/chats',
		},
	],
	navLinks: [
		{ href: '/', label: 'Discover' },
		{ href: '/matches', label: 'Matches' },
		{ href: '/chats', label: 'Chats' },
	],
}
