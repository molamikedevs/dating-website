'use client'

import GlobalErrorBoundary from "@/components/global-error-boundary"



export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return <GlobalErrorBoundary error={error} reset={reset} />
}
