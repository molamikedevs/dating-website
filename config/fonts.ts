// fonts.ts
import { Playfair_Display, Nunito } from 'next/font/google'

export const playfair = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-playfair',
	weight: ['500', '600', '700'],
})

export const nunito = Nunito({
	subsets: ['latin'],
	variable: '--font-nunito',
	weight: ['400', '500', '600'],
})
