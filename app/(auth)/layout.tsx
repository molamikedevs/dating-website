import Image from 'next/image'

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-screen flex">
			{/* Left side - Form (50% width) */}
			<div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 lg:py-0 bg-white dark:bg-zinc-900">
				<div className="w-full max-w-md">{children}</div>
			</div>

			{/* Right side - Image (50% width) - Hidden on mobile */}
			<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
				<div className="w-full h-full relative">
					<Image
						src="/side-image.jpg"
						alt="Dating couple"
						fill
						className="object-cover"
						priority
					/>
					{/* Dark overlay for better contrast */}
					<div className="absolute inset-0 bg-black/20"></div>

					{/* Text overlay */}
					<div className="absolute inset-0 flex items-center justify-center p-12 text-center text-white">
						<div className="max-w-md">
							<h1 className="text-4xl font-bold mb-6">
								Find Your Perfect Match
							</h1>
							<p className="text-xl opacity-90">
								Connect with amazing people and build meaningful relationships
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
