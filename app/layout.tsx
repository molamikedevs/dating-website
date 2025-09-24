import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'

import { siteConfig } from '@/config/site'
import { playfair, nunito } from '@/config/fonts'
import { ThemeProvider } from '@/components/theme-provider'
export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: '/favicon.ico',
	},
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
}

export default function GlobalLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${playfair.variable} ${nunito.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="light">
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
