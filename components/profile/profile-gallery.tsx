'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Input } from '../ui/input'
import { X, ZoomIn } from 'lucide-react'
import { Profile } from '@/types'
import { toast } from 'sonner'
import GalleryModal from '../gallery-modal'
import { deleteGalleryImage, uploadImage } from '@/lib/actions/action.profile'

interface ProfileGalleryProps {
  draft: Profile
  isEditing: boolean
  onDraftChange: (draft: Profile) => void
}

const ProfileGallery = ({
  isEditing,
  draft,
  onDraftChange,
}: ProfileGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  
  const gallery_images = draft.gallery_images || []

  /** Delete gallery image */
  const handleDeleteGalleryImage = async (url: string) => {
    try {
      const nextImages = gallery_images.filter(i => i !== url)
      await deleteGalleryImage(nextImages)
      
      const newDraft = { ...draft, gallery_images: nextImages }
      onDraftChange(newDraft)
      toast.success('Image removed')
    } catch {
      toast.error('Failed to remove image')
    }
  }

  /** Upload new gallery images */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    
    const files = Array.from(e.target.files)
    if (gallery_images.length + files.length > 6) {
      toast.error('You can only have up to 6 images total')
      return
    }

    setIsUploading(true)
    try {
      const uploadPromises = files.map(file => uploadImage(file))
      const newImageUrls = await Promise.all(uploadPromises)
      
      const updatedImages = [...gallery_images, ...newImageUrls].slice(0, 6)
      const newDraft = { ...draft, gallery_images: updatedImages }
      
      onDraftChange(newDraft)
      toast.success('Images uploaded successfully')
    } catch {
      toast.error('Failed to upload images')
    } finally {
      setIsUploading(false)
      // Reset the input
      e.target.value = ''
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-900 shadow rounded-xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-pink-600">Gallery</h2>
        {isEditing && (
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={isUploading || gallery_images.length >= 6}
              className="w-auto"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-gray-100 opacity-50 flex items-center justify-center">
                <span className="text-sm">Uploading...</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mt-1">
        {gallery_images.length}/6 photos {gallery_images.length >= 6 && '(Maximum reached)'}
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        {gallery_images.map((img, idx) => (
          <div key={idx} className="relative group cursor-pointer">
            {/* Clickable image overlay */}
            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
              onClick={() => setSelectedImageIndex(idx)}
            >
              <ZoomIn className="text-white w-6 h-6" />
            </div>

            <Image
              src={img}
              width={400}
              height={400}
              alt={`Gallery image ${idx + 1}`}
              className="rounded-lg object-cover w-full h-40"
            />

            {isEditing && (
              <Button
                onClick={e => {
                  e.stopPropagation()
                  handleDeleteGalleryImage(img)
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
                aria-label="Remove image"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        ))}
        
        {/* Empty slots for better UI */}
        {isEditing && gallery_images.length < 6 && (
          Array.from({ length: 6 - gallery_images.length }).map((_, idx) => (
            <div key={`empty-${idx}`} className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center text-gray-400">
              <span>Add Photo</span>
            </div>
          ))
        )}
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        images={gallery_images}
        isOpen={selectedImageIndex !== null}
        onOpenChange={open => !open && setSelectedImageIndex(null)}
        initialIndex={selectedImageIndex || 0}
        onDeleteImage={isEditing ? handleDeleteGalleryImage : undefined}
        isEditing={isEditing}
      />
    </div>
  )
}

export default ProfileGallery