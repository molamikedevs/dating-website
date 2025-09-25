'use client'

import { Textarea } from '@/components/ui/textarea'
import { Profile } from '@/types'

interface ProfileAboutProps {
	draft: Profile
	isEditing: boolean
	onDraftChange: <K extends keyof Profile>(field: K, value: Profile[K]) => void
}

const ProfileAbout = ({
	draft,
	isEditing,
	onDraftChange,
}: ProfileAboutProps) => {
	return (
		<div className="bg-white dark:bg-neutral-900 shadow rounded-xl p-6 space-y-3">
			<h2 className="text-xl font-semibold text-pink-600">About Me</h2>
			{isEditing ? (
				<Textarea
					value={draft.bio || ''}
					onChange={e => onDraftChange('bio', e.target.value)}
					className="min-h-[120px] dark:bg-neutral-800 dark:text-white"
					placeholder="Tell people about yourself…"
				/>
			) : (
				<p className="text-muted-foreground whitespace-pre-wrap">
					{draft.bio || 'No bio yet.'}
				</p>
			)}
		</div>
	)
}

export default ProfileAbout