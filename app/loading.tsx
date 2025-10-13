'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Loader } from '@/components/icons'

export default function Loading() {
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		const handleStart = () => setIsLoading(true)
		const handleComplete = () => setIsLoading(false)

		// Listen to route changes
		handleStart()

		// Simulate route change complete after a short delay
		const timer = setTimeout(() => {
			handleComplete()
		}, 300)

		return () => clearTimeout(timer)
	}, [pathname, searchParams])

	if (!isLoading) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
			<div className="flex flex-col items-center gap-3">
				<Loader className="h-8 w-8 animate-spin text-pink-600" />
				<p className="text-sm text-muted-foreground">Loading...</p>
			</div>
		</div>
	)
}
