'use client'

import { Camera } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Profile } from '@/types'
import { uploadImage } from '@/lib/actions/action.profile'
import { toast } from 'sonner'

interface ProfileHeaderProps {
	draft: Profile
	isEditing: boolean
	isSaving: boolean
	onEditToggle: () => void
	onSave: () => void
	onCancel: () => void
	onDraftChange: (draft: Profile) => void
}

const ProfileHeader = ({
	draft,
	isEditing,
	isSaving,
	onEditToggle,
	onSave,
	onCancel,
	onDraftChange,
}: ProfileHeaderProps) => {
	const handleProfilePictureChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!e.target.files?.length) return
		const file = e.target.files[0]

		try {
			const url = await uploadImage(file)
			const updated = { ...draft, profile_picture: url }
			onDraftChange(updated)
			toast.success('Profile picture updated!')
		} catch {
			toast.error('Failed to update profile picture.')
		}
	}

	return (
		<div className="bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-6 flex flex-col items-center">
			<div className="relative w-32 h-32">
				{draft.profile_picture ? (
					<Image
						src={draft.profile_picture}
						alt={draft.name || 'Profile'}
						fill
						className="rounded-full object-cover border-4 border-pink-500 shadow"
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold rounded-full border-4 border-pink-500 shadow">
						<p className="text-4xl sm:text-6xl lg:text-7xl">
							{draft.name?.charAt(0)?.toUpperCase() || '?'}
						</p>
					</div>
				)}

				{isEditing && (
					<label className="absolute bottom-0 right-0 bg-pink-600 hover:bg-pink-700 p-2 rounded-full cursor-pointer shadow-md">
						<Camera className="text-white" size={18} />
						<input
							type="file"
							className="hidden"
							onChange={handleProfilePictureChange}
						/>
					</label>
				)}
			</div>

			<h1 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
				{draft.name}
			</h1>
			<p className="text-gray-600 dark:text-gray-300">
				{draft.age} • {draft.gender}
			</p>

			<div className="mt-4 flex gap-3">
				{!isEditing ? (
					<Button
						className="bg-pink-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-pink-700"
						onClick={onEditToggle}>
						Edit Profile
					</Button>
				) : (
					<>
						<Button
							className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
							onClick={onSave}
							disabled={isSaving}>
							{isSaving ? 'Saving...' : 'Save'}
						</Button>
						<Button
							className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
							onClick={onCancel}>
							Cancel
						</Button>
					</>
				)}
			</div>
		</div>
	)
}

export default ProfileHeader
