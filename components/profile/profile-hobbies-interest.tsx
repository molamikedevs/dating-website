import React from 'react'
import { Badge } from '../ui/badge'
import { hobbiesList, interestsList, languagesList } from '@/lib/schema'
import { Profile } from '@/types'

interface ProfileHobbiesInterestProps {
	isEditing: boolean
	onDraftChange: <K extends keyof Profile>(field: K, value: Profile[K]) => void
	draft: Profile | null
}

const ProfileHobbiesInterest = ({
	isEditing,
	draft,
	onDraftChange,
}: ProfileHobbiesInterestProps) => {
	const interests = draft?.interests
	const hobbies = draft?.hobbies
	const languages = draft?.languages

	const toggleInArray = (
		key: 'interests' | 'hobbies' | 'languages',
		value: string
	) => {
		if (!draft) return
		const current = new Set(draft[key] || [])
		if (current.has(value)) current.delete(value)
		else current.add(value)
		onDraftChange(key, Array.from(current))
	}

	return (
		<div className="bg-white dark:bg-neutral-900 shadow rounded-xl p-6 space-y-4">
			<h2 className="text-xl font-semibold text-pink-600">Interests</h2>
			<div className="flex flex-wrap gap-2">
				{interestsList.map(tag => {
					const selected = (interests || []).includes(tag)
					return (
						<Badge
							key={tag}
							className={
								selected
									? 'bg-pink-600 text-white'
									: 'bg-neutral-200 dark:bg-neutral-800'
							}
							onClick={() =>
								isEditing && toggleInArray('interests', tag)
							}
							style={{
								cursor: isEditing ? 'pointer' : 'default',
							}}>
							{tag}
						</Badge>
					)
				})}
			</div>

			<h2 className="text-xl font-semibold text-pink-600 mt-6">Hobbies</h2>
			<div className="flex flex-wrap gap-2">
				{hobbiesList.map(tag => {
					const selected = (hobbies || []).includes(tag)
					return (
						<Badge
							key={tag}
							className={
								selected
									? 'bg-purple-600 text-white'
									: 'bg-neutral-200 dark:bg-neutral-800'
							}
							onClick={() =>
								isEditing  && toggleInArray('hobbies', tag)
							}
							style={{
								cursor: isEditing ? 'pointer' : 'default',
							}}>
							{tag}
						</Badge>
					)
				})}
			</div>

			<h2 className="text-xl font-semibold text-pink-600 mt-6">Languages</h2>
			<div className="flex flex-wrap gap-2">
				{languagesList.map(tag => {
					const selected = (languages || []).includes(tag)
					return (
						<Badge
							key={tag}
							className={
								selected
									? 'bg-blue-600 text-white'
									: 'bg-neutral-200 dark:bg-neutral-800'
							}
							onClick={() =>
								isEditing && toggleInArray('languages', tag)
							}
							style={{
								cursor: isEditing ? 'pointer' : 'default',
							}}>
							{tag}
						</Badge>
					)
				})}
			</div>
		</div>
	)
}

export default ProfileHobbiesInterest
