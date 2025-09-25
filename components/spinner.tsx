import React from 'react'
import { Loader } from './icons'

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
			<div className="flex flex-col items-center gap-3">
				<Loader className="h-8 w-8 animate-spin text-pink-600" />
				<p className="text-sm text-muted-foreground">Loading...</p>
			</div>
		</div>
  )
}

export default Spinner
