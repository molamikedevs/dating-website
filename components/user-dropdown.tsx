'use client'

import {
	LogOut,
	User,
	MessageCircleCode,
	Users2,
	Settings,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/context/auth-context'
import { Profile } from '@/types'

interface UserDropdownProps {
	profile: Profile | null
}

export default function UserDropdown({ profile }: UserDropdownProps) {
	const router = useRouter()
	const { signOut } = useAuth()

	// Show skeleton while profile is loading
	if (!profile) {
		return (
			<div className="flex items-center gap-2">
				<div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
				<div className="ml-2 hidden sm:block">
					<div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
				</div>
			</div>
		)
	}

	const displayName = profile.name || 'John Doe'
	const avatarUrl = profile.avatar_url || ''

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex items-center gap-2 cursor-pointer">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={avatarUrl}
							alt={displayName}
							className="object-cover"
						/>
						<AvatarFallback className="bg-pink-100 text-pink-800">
							{displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="ml-2 hidden sm:block">
						<span className="text-xs font-body border border-gray-300 dark:border-zinc-700 rounded-md px-2 py-1">
							Hi, {displayName.split(' ')[0]} {/* Use space instead of @ */}
						</span>
					</div>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium">{displayName}</p>
						{profile?.age && profile?.location && (
							<p className="text-xs text-muted-foreground">
								{profile.age} • {profile.location}
							</p>
						)}
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => router.push('/profile')}>
					<User className="h-4 w-4 mr-2" />
					Profile
				</DropdownMenuItem>

				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => router.push('/matches')}>
					<Users2 className="h-4 w-4 mr-2" />
					Matches
				</DropdownMenuItem>

				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => router.push('/chats')}>
					<MessageCircleCode className="h-4 w-4 mr-2" />
					Chats
				</DropdownMenuItem>

				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => router.push('/')}>
					<User className="h-4 w-4 mr-2" />
					Discover
				</DropdownMenuItem>

				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => router.push('/settings')}>
					<Settings className="h-4 w-4 mr-2" />
					Account Settings
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={() => signOut()}
					className="text-red-600 cursor-pointer">
					<LogOut className="h-4 w-4 mr-2" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
