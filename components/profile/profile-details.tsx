'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import { Profile } from '@/types'
import { Badge } from '@/components/ui/badge'
import GalleryModal from '@/components/gallery-modal'
import { Button } from '@/components/ui/button'

interface ProfileDetailsProps {
	profile: Profile
}

export default function ProfileDetails({
	profile: {
		name,
		age,
		gender,
		location,
		occupation,
		height,
		body_type,
		orientation,
		education,
		smoking,
		drinking,
		avatar_url,
		bio,
		interests,
		hobbies,
		relationship_goals,
		gallery_images,
		languages,
	},
}: ProfileDetailsProps) {
	const router = useRouter()
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
		null
	)

	return (
		<div className="max-w-5xl mx-auto p-6 space-y-6">
			<Button
				variant="outline"
				onClick={() => router.back()}
				className="mb-4 ml-4 cursor-pointer">
				Go Back
			</Button>

			{/* HEADER - Read Only */}
			<div className="bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-6 flex flex-col items-center justify-between">
				<div className=" w-32 h-32 sm:mb-4 mb-[-2rem]">
					{avatar_url ? (
						<Image
							src={avatar_url}
							alt={name}
							width={400}
							height={400}
							className="w-full h-full  object-cover rounded-full border-4 border-pink-400 dark:border-pink-500"
						/>
					) : (
						<div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold rounded-full border border-pink-400 dark:border-pink-500">
							<p className="text-7xl">{name.charAt(0).toUpperCase()}</p>
						</div>
					)}
				</div>

				<h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:mt-3 mt-[2rem]">
					{name}
				</h1>
				<p className="text-gray-600 dark:text-gray-300">
					{age} • {gender}
				</p>
			</div>

			{/* ABOUT - Read Only */}
			<div className="bg-white dark:bg-neutral-900 shadow rounded-xl p-6 space-y-3">
				<h2 className="text-xl font-semibold text-pink-600">About Me</h2>
				<p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
					{bio || 'No bio yet.'}
				</p>
			</div>

			{/* QUICK INFO - Read Only */}
			<div className="bg-white dark:bg-neutral-900 shadow rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
				<div>
					<h3 className="font-semibold mb-1">Name</h3>
					<p className="text-gray-700 dark:text-gray-200">{name}</p>
				</div>
				<div>
					<h3 className="font-semibold mb-1">Age</h3>
					<p className="text-gray-700 dark:text-gray-200">{age}</p>
				</div>
				<div>
					<h3 className="font-semibold mb-1">Location</h3>
					<p className="text-gray-700 dark:text-gray-200">{location || '—'}</p>
				</div>
				<div>
					<h3 className="font-semibold mb-1">Occupation</h3>
					<p className="text-gray-700 dark:text-gray-200">
						{occupation || '—'}
					</p>
				</div>
				<div>
					<h3 className="font-semibold mb-1">Height</h3>
					<p className="text-gray-700 dark:text-gray-200">
						{height ? `${height} cm` : '—'}
					</p>
				</div>
				<div>
					<h3 className="font-semibold mb-1">Body Type</h3>
					<p className="text-gray-700 dark:text-gray-200">{body_type || '—'}</p>
				</div>
				<div>
					<h3 className="font-semibold mb-1">Orientation</h3>
					<p className="text-gray-700 dark:text-gray-200">
						{orientation || '—'}
					</p>
				</div>
				<div>
					<h3 className="font-semibold mb-1">Education</h3>
					<p className="text-gray-700 dark:text-gray-200">{education || '—'}</p>
				</div>
			</div>

			{/* LIFESTYLE - Read Only */}
			<div className="bg-white dark:bg-neutral-900 shadow rounded-xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
				<div>
					<h3 className="font-semibold mb-1">Smoking</h3>
					<p className="text-gray-700 dark:text-gray-200">{smoking || '—'}</p>
				</div>
				<div>
					<h3 className="font-semibold mb-1">Drinking</h3>
					<p className="text-gray-700 dark:text-gray-200">{drinking || '—'}</p>
				</div>
				<div>
					<h3 className="font-semibold mb-1">Relationship Goals</h3>
					<p className="text-gray-700 dark:text-gray-200">
						{relationship_goals || '—'}
					</p>
				</div>
			</div>

			{/* INTERESTS & HOBBIES - Read Only */}
			<div className="bg-white dark:bg-neutral-900 shadow rounded-xl p-6 space-y-4">
				<h2 className="text-xl font-semibold text-pink-600">Interests</h2>
				<div className="flex flex-wrap gap-2">
					{(interests || []).map(tag => (
						<Badge key={tag} className="bg-pink-600 text-white">
							{tag}
						</Badge>
					))}
					{(!interests || interests.length === 0) && (
						<p className="text-gray-500">No interests listed</p>
					)}
				</div>

				<h2 className="text-xl font-semibold text-pink-600 mt-6">Hobbies</h2>
				<div className="flex flex-wrap gap-2">
					{(hobbies || []).map(tag => (
						<Badge key={tag} className="bg-purple-600 text-white">
							{tag}
						</Badge>
					))}
					{(!hobbies || hobbies.length === 0) && (
						<p className="text-gray-500">No hobbies listed</p>
					)}
				</div>

				<h2 className="text-xl font-semibold text-pink-600 mt-6">Languages</h2>
				<div className="flex flex-wrap gap-2">
					{(languages || []).map(tag => (
						<Badge key={tag} className="bg-blue-600 text-white">
							{tag}
						</Badge>
					))}
					{(!languages || languages.length === 0) && (
						<p className="text-gray-500">No languages listed</p>
					)}
				</div>
			</div>

			{/* GALLERY - Read Only with viewing capability */}
			<div className="bg-white dark:bg-neutral-900 shadow rounded-xl p-6">
				<h2 className="text-xl font-semibold text-pink-600">Gallery</h2>
				<p className="text-sm text-muted-foreground mt-1">
					{gallery_images?.length || 0} photos
				</p>
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
					{(gallery_images || []).map((img, idx) => (
						<div key={idx} className="relative group cursor-pointer">
							{/* Clickable image overlay */}
							<div
								className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
								onClick={() => setSelectedImageIndex(idx)}>
								<ZoomIn className="text-white w-6 h-6" />
							</div>

							<Image
								src={img}
								width={400}
								height={400}
								alt={`Gallery image ${idx + 1}`}
								className="rounded-lg object-cover w-full h-40"
							/>
						</div>
					))}
				</div>

				{/* Gallery Modal for viewing */}
				<GalleryModal
					images={gallery_images || []}
					isOpen={selectedImageIndex !== null}
					onOpenChange={open => !open && setSelectedImageIndex(null)}
					initialIndex={selectedImageIndex || 0}
					isEditing={false}
					isOwner={false}
				/>
			</div>
		</div>
	)
}
