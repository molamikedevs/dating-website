
'use client'

import { useState } from 'react'
import { Profile } from '@/types'
import { updateProfile } from '@/lib/actions/action.profile'
import { toast } from 'sonner'
import {ProfileAbout, ProfileHeader, ProfileGallery, ProfileQuickInfo, ProfileLifestyle, ProfileHobbiesInterest} from '@/components/profile'


export default function ProfileCard({ profile }: { profile: Profile }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<Profile>(profile)
  const [isSaving, setIsSaving] = useState(false)

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
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <ProfileHeader
        draft={draft}
        isEditing={isEditing}
        isSaving={isSaving}
        onEditToggle={() => setIsEditing(!isEditing)}
        onSave={handleSave}
        onCancel={handleCancel}
        onDraftChange={setDraft}
      />

      <ProfileAbout
        draft={draft}
        isEditing={isEditing}
        onDraftChange={patchDraft}
      />

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

      <ProfileHobbiesInterest
        draft={draft}
        isEditing={isEditing}
        onDraftChange={patchDraft}
      />

      <ProfileGallery
        draft={draft}
        isEditing={isEditing}
        onDraftChange={setDraft}
      />
    </div>
  )
}