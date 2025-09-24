import { siteConfig } from '@/config/site'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import { ThemeSwitch } from './theme-switch'
import { MobileNavProps } from '@/types'
import SignoutButton from './signout-button'



const MobileNav = ({
	isOpen,
	onClose,
	pathname,
	profile,
	unreadCountsByType,
}: MobileNavProps) => {
	return (
		<div
			className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
				isOpen ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'
			}`}>
			<div className="flex flex-col items-start space-y-3 px-2 py-4">
				{profile &&
					siteConfig.navLinks.map(({ href, label }) => {
						// Determine notification count based on the link
						let count = 0
						if (href === '/chats') {
							count = unreadCountsByType.message
						} else if (href === '/likes') {
							count = unreadCountsByType.like
						}

						return (
							<Link
								key={href}
								href={href}
								className={`text-base font-medium transition-colors flex items-center gap-2 ${
									pathname === href
										? 'text-pink-600'
										: 'text-gray-700 dark:text-gray-200 hover:text-pink-500'
								}`}
								onClick={() => onClose()}>
								{label}
								{count > 0 && (
									<span className="relative">
										<Bell size={16} />
										<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
											{count}
										</span>
									</span>
								)}
							</Link>
						)
					})}

				{!profile ? (
					<>
						<Link
							href="/login"
							className="text-gray-700 dark:text-gray-200 hover:text-pink-600 text-base font-medium"
							onClick={() => onClose()}>
							Login
						</Link>
						<Link
							href="/register"
							className="text-base text-white px-4 py-2 rounded-full font-medium bg-gradient-to-r from-pink-900 via-pink-600 to-pink-900 hover:from-pink-600 hover:to-pink-800 transition"
							onClick={() => onClose()}>
							Register
						</Link>
					</>
				) : (
					<>
						<Link
							href="/profile"
							className="text-gray-700 dark:text-gray-200 hover:text-pink-600 text-base font-medium"
							onClick={() => onClose()}>
							Profile
						</Link>
						<Link
							href="/settings"
							className="text-gray-700 dark:text-gray-200 hover:text-pink-600 text-base font-medium"
							onClick={() => onClose()}>
							Settings
						</Link>
						<SignoutButton />
					</>
				)}

				<div className="pt-2">
					<ThemeSwitch />
				</div>
			</div>
		</div>
	)
}

export default MobileNav
