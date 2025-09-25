
'use client'

import { useState } from 'react'
import { Profile } from '@/types'
import { updateProfile } from '@/lib/actions/action.profile'
import { toast } from 'sonner'
import {ProfileAbout, ProfileHeader, ProfileGallery, ProfileQuickInfo, ProfileLifestyle, ProfileHobbiesInterest} from '@/components/profile'
import Spinner from '../spinner'

export default function ProfileCard({ profile }: { profile: Profile }) {
	const [isEditing, setIsEditing] = useState(false)
	const [draft, setDraft] = useState<Profile>(profile)
	const [isSaving, setIsSaving] = useState(false)

	if (!draft) {
		return <Spinner />
	}

	const handleSave = async () => {
		setIsSaving(true)
		try {
			const updated = await updateProfile(draft)
			setDraft(updated)
			setIsEditing(false)
			toast.success('Profile updated successfully')
		} catch (error) {
			console.log(error)
			toast('Failed to update profile')
		} finally {
			setIsSaving(false)
		}
	}

	const handleCancel = () => {
		setDraft(profile)
		setIsEditing(false)
	}

	const patchDraft = <K extends keyof Profile>(key: K, value: Profile[K]) => {
		setDraft(prev => ({ ...prev, [key]: value }))
	}

	return (
		<div
			className="max-w-6xl mx-auto p-6 grid gap-6 
    grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{/* Header spans full width */}
			<div className="col-span-1 md:col-span-2 lg:col-span-3">
				<ProfileHeader
					draft={draft}
					isEditing={isEditing}
					isSaving={isSaving}
					onEditToggle={() => setIsEditing(!isEditing)}
					onSave={handleSave}
					onCancel={handleCancel}
					onDraftChange={setDraft}
				/>
			</div>

			{/* About + Interests/Hobbies stacked in wider column */}
			<div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-6">
				<ProfileAbout
					draft={draft}
					isEditing={isEditing}
					onDraftChange={patchDraft}
				/>
				<ProfileHobbiesInterest
					draft={draft}
					isEditing={isEditing}
					onDraftChange={patchDraft}
				/>
			</div>

			{/* Quick Info + Lifestyle stacked in narrower column */}
			<div className="col-span-1 flex flex-col gap-6">
				<ProfileQuickInfo
					draft={draft}
					isEditing={isEditing}
					onDraftChange={patchDraft}
				/>
				<ProfileLifestyle
					draft={draft}
					isEditing={isEditing}
					onDraftChange={patchDraft}
				/>
			</div>

			{/* Gallery spans full width */}
			<div className="col-span-1 md:col-span-2 lg:col-span-3">
				<ProfileGallery
					draft={draft}
					isEditing={isEditing}
					onDraftChange={setDraft}
				/>
			</div>
		</div>
	)
}