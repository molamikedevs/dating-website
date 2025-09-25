import React from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { Label } from '../ui/label'
import { drinkingOpts, smokingOpts, relationshipGoals } from '@/lib/schema'
import { Profile } from '@/types'

interface ProfileLifestyleProps {
	isEditing: boolean
	draft: Profile | null
	onDraftChange: <K extends keyof Profile>(field: K, value: Profile[K]) => void
}

const ProfileLifestyle = ({
	isEditing,
	draft,
	onDraftChange,
}: ProfileLifestyleProps) => {
	const smoking = draft?.smoking
	const drinking = draft?.drinking
	const relationship_goals = draft?.relationship_goals

	return (
		<div className="bg-white dark:bg-neutral-900 shadow rounded-xl p-6 grid grid-cols-1 sm:grid-cols-3">
			<div>
				<Label className="mb-2 block">Smoking</Label>
				{isEditing ? (
					<Select
						value={smoking || undefined}
						onValueChange={v => onDraftChange('smoking', v)}>
						<SelectTrigger className="dark:bg-neutral-800 dark:text-white">
							<SelectValue placeholder="Select smoking" />
						</SelectTrigger>
						<SelectContent>
							{smokingOpts.map(v => (
								<SelectItem key={v} value={v}>
									{v}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				) : (
					<p className="text-muted-foreground dark:text-neutral-500 font-semibold text-sm">
						{smoking || '—'}
					</p>
				)}
			</div>

			<div>
				<Label className="mb-2 block">Drinking</Label>
				{isEditing ? (
					<Select
						value={drinking || undefined}
						onValueChange={v => onDraftChange('drinking', v)}>
						<SelectTrigger className="dark:bg-neutral-800 dark:text-white">
							<SelectValue placeholder="Select drinking" />
						</SelectTrigger>
						<SelectContent>
							{drinkingOpts.map(v => (
								<SelectItem key={v} value={v}>
									{v}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				) : (
					<p className="text-muted-foreground dark:text-neutral-500 font-semibold text-sm">
						{drinking || '—'}
					</p>
				)}
			</div>

			<div>
				<Label className="mb-2 block">Looking For</Label>
				{isEditing ? (
					<Select
						value={relationship_goals || undefined}
						onValueChange={v => onDraftChange('relationship_goals', v)}>
						<SelectTrigger className="dark:bg-neutral-800 dark:text-white">
							<SelectValue placeholder="Select goal" />
						</SelectTrigger>
						<SelectContent>
							{relationshipGoals.map(g => (
								<SelectItem key={g} value={g}>
									{g}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				) : (
					<p className="text-muted-foreground dark:text-neutral-500 font-semibold text-sm">
						{relationship_goals || '—'}
					</p>
				)}
			</div>
		</div>
	)
}

export default ProfileLifestyle
