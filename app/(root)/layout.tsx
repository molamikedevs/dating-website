
import React from 'react'
import Navbar from '@/components/navbar'


const RootLayout = async({ children }: { children: React.ReactNode }) => {

	return (
		<div>
			<Navbar />
			{children}
		</div>
	)
}

export default RootLayout
