import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { Profile } from '@/types'
import { bodyTypes, educationOpts, orientations } from '@/lib/schema'
import LocationInput from '../location-input'

interface ProfileQuickInfoProps {
	isEditing: boolean
	draft: Profile | null
	onDraftChange: <K extends keyof Profile>(field: K, value: Profile[K]) => void
}

const ProfileQuickInfo = ({
	isEditing,
	draft,
	onDraftChange,
}: ProfileQuickInfoProps) => {
	const location = draft?.location ?? ''
	const occupation = draft?.occupation ?? ''
	const height = draft?.height ?? ''
	const body_type = draft?.body_type ?? ''
	const orientation = draft?.orientation ?? ''
	const education = draft?.education ?? ''

	return (
		<div className="bg-white dark:bg-neutral-900 shadow rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
			<div>
				<Label className="mb-1 block">Name</Label>
				<Input value={draft?.name} disabled />
			</div>

			<div>
				<Label className="mb-1 block">Age</Label>
				<Input value={String(draft?.age)} disabled />
			</div>

			<div>
				<LocationInput
					value={location}
					onChange={value =>
						draft &&
						onDraftChange('location', value)
					}
					disabled={!isEditing}
					placeholder="e.g., Baku, Azerbaijan"
				/>
			</div>

			<div>
				<Label className="mb-1 block">Occupation</Label>
				<Input
					value={occupation || ''}
					placeholder="e.g., Software Engineer"
					onChange={e =>
						draft && onDraftChange('occupation', e.target.value)
					}
					disabled={!isEditing}
					className="dark:bg-neutral-800 dark:text-white"
				/>
			</div>

			<div>
				<Label className="mb-1 block">Height (cm)</Label>
				<Input
					type="number"
					placeholder="e.g., 170"
					value={height ?? ''}
					onChange={e =>
						draft && onDraftChange('height', Number(e.target.value))
					}
					disabled={!isEditing}
					className="dark:bg-neutral-800 dark:text-white"
				/>
			</div>

			<div>
				<Label className="mb-1 block">Body Type</Label>
				{isEditing ? (
					<Select
						value={body_type || undefined}
						onValueChange={v =>
							draft &&
							onDraftChange('body_type', v)
						}>
						<SelectTrigger className="dark:bg-neutral-800 dark:text-white">
							<SelectValue placeholder="Select body type" />
						</SelectTrigger>
						<SelectContent>
							{bodyTypes.map(b => (
								<SelectItem key={b} value={b}>
									{b}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				) : (
					<p className="text-gray-700 dark:text-gray-200">{body_type || '—'}</p>
				)}
			</div>

			<div>
				<Label className="mb-1 block">Orientation</Label>
				{isEditing ? (
					<Select
						value={orientation || undefined}
						onValueChange={v =>
							draft &&
							onDraftChange('orientation', v)
						}>
						<SelectTrigger className="dark:bg-neutral-800 dark:text-white">
							<SelectValue placeholder="Select orientation" />
						</SelectTrigger>
						<SelectContent>
							{orientations.map(o => (
								<SelectItem key={o} value={o}>
									{o}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				) : (
					<p className="text-gray-700 dark:text-gray-200">
						{orientation || '—'}
					</p>
				)}
			</div>

			<div>
				<Label className="mb-1 block">Education</Label>
				{isEditing ? (
					<Select
						value={education || undefined}
						onValueChange={v =>
							draft &&
							onDraftChange('education', v)
						}>
						<SelectTrigger className="dark:bg-neutral-800 dark:text-white">
							<SelectValue placeholder="Select education" />
						</SelectTrigger>
						<SelectContent>
							{educationOpts.map(e => (
								<SelectItem key={e} value={e}>
									{e}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				) : (
					<p className="text-gray-700 dark:text-gray-200">{education || '—'}</p>
				)}
			</div>
		</div>
	)
}

export default ProfileQuickInfo
