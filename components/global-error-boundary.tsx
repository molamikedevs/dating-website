'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface GlobalErrorBoundaryProps {
	error?: Error
	reset?: () => void
}

export default function GlobalErrorBoundary({
	error,
	reset,
}: GlobalErrorBoundaryProps) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error('Global error caught:', error)
	}, [error])

	return (
		<div className="flex items-center justify-center bg-background">
			<div className="w-full max-w-md rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
				<div className="flex flex-col items-center text-center">
					<AlertTriangle className="mb-4 h-12 w-12 text-destructive" />
					<h2 className="mb-2 text-2xl font-semibold">Something went wrong!</h2>
					<p className="mb-6 text-muted-foreground">
						{error?.message ||
							'An unexpected error occurred. Please try again.'}
					</p>

					<div className="flex gap-3">
						{reset && (
							<Button
								onClick={reset}
								variant="default"
								className="gap-2 cursor-pointer">
								<RefreshCw className="h-4 w-4" />
								Try Again
							</Button>
						)}

						<Button
							onClick={() => (window.location.href = '/')}
							variant="outline"
							className="gap-2 cursor-pointer">
							<Home className="h-4 w-4" />
							Go Home
						</Button>
					</div>
				</div>
			</div>
		</div>
	)

}
