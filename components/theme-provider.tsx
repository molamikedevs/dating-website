'use client'

import { Toaster } from '@/components/ui/sonner'
import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { AuthProvider } from '@/context/auth-context'

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {


	return (
		<NextThemesProvider {...props}>
			<AuthProvider>{children}</AuthProvider>
			<Toaster />
		</NextThemesProvider>
	)
}
