'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Bell, Menu, X } from 'lucide-react'
import { ThemeSwitch } from './theme-switch'
import { siteConfig } from '@/config/site'
import MobileNav from './mobile-nav'
import { usePathname } from 'next/navigation'
import UserDropdown from './user-dropdown'
import { useAuth } from '@/context/auth-context'
import { useTheme } from 'next-themes'

const Navbar = () => {
	const { profile, loading, session } = useAuth()
	const unreadCountsByType = { message: 0, like: 0 }
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// Don't render navbar on complete-profile page
	if (mounted && pathname === '/complete-profile') {
		return null
	}

	// Use fallback theme if not mounted yet
	const currentTheme = mounted ? resolvedTheme : 'light'

	return (
		<nav className="w-full sticky top-0 z-50 bg-white dark:bg-black shadow-md px-4 py-3">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				{/* Logo */}
				<Link href={profile ? '/' : '/login'}>
					<Image
						src={currentTheme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
						alt="Logo"
						width={150}
						height={100}
						className="object-contain"
						priority
					/>
				</Link>

				{/* Desktop Nav */}
				<div className="hidden sm:flex items-center space-x-6">
					{/* Always show navigation links - they update when auth state changes */}
					{siteConfig.navLinks.map(({ href, label }) => {
						let count = 0
						if (href === '/chats') count = unreadCountsByType.message
						else if (href === '/likes') count = unreadCountsByType.like

						return (
							<Link
								key={href}
								href={href}
								className={`text-sm font-semibold hover:text-pink-600 transition-colors flex items-center gap-1 ${
									pathname === href
										? 'text-pink-600'
										: 'text-gray-700 dark:text-gray-200'
								}`}>
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

					{/* Auth-dependent items - show based on current auth state */}
					{loading ? (
						// Show a small loading indicator for auth section only
						<div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
					) : session ? (
						<UserDropdown profile={profile} />
					) : (
						<>
							<Link
								href="/login"
								className="text-gray-700 dark:text-gray-200 hover:text-pink-600 text-sm font-semibold">
								Login
							</Link>
							<Link
								href="/register"
								className="text-sm text-white px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-900 via-pink-600 to-pink-900 hover:from-pink-600 hover:to-pink-800 transition">
								Register
							</Link>
						</>
					)}
					<ThemeSwitch />
				</div>

				{/* Mobile Menu Button */}
				<div className="sm:hidden">
					<Button
						variant="ghost"
						onClick={() => setIsMenuOpen(prev => !prev)}
						aria-label="Toggle menu">
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</Button>
				</div>
			</div>

			{/* Mobile Dropdown Menu */}
			<MobileNav
				isOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				pathname={pathname}
				profile={profile}
				unreadCountsByType={unreadCountsByType}
				loading={loading}
			/>
		</nav>
	)
}

export default Navbar
