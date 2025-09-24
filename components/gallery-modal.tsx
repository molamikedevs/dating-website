'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselApi
} from '@/components/ui/carousel'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GalleryModalProps {
	images: string[]
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	initialIndex?: number
	onDeleteImage?: (imageUrl: string) => void
	isEditing?: boolean
	isOwner?: boolean
}

export default function GalleryModal({
	images,
	isOpen,
	onOpenChange,
	initialIndex = 0,
	onDeleteImage,
	isEditing = false,
	isOwner = false,
}: GalleryModalProps) {
	const [currentIndex, setCurrentIndex] = useState(initialIndex)
	const [api, setApi] = useState<CarouselApi>()

	// Set up carousel API to track current slide
	useEffect(() => {
		if (!api) return

		const handleSelect = () => {
			setCurrentIndex(api.selectedScrollSnap())
		}

		api.on('select', handleSelect)
		return () => {
			api.off('select', handleSelect)
		}
	}, [api])

	const handleDelete = (imageUrl: string) => {
		onDeleteImage?.(imageUrl)
		if (images.length <= 1) {
			onOpenChange(false)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-white dark:bg-black shadow-md border-0 [&>button:last-child]:hidden">
				<Carousel
					className="w-full relative"
					setApi={setApi}
					opts={{ startIndex: initialIndex }}>
					{/* Close button */}
					<Button
						variant="ghost"
						size="icon"
						className="absolute top-4 right-4 z-50 bg-black/50 text-white hover:bg-black/70 hover:text-white"
						onClick={() => onOpenChange(false)}>
						<X className="w-5 h-5" />
					</Button>

					{/* Delete button */}
					{isOwner && isEditing && onDeleteImage && (
						<Button
							variant="destructive"
							size="sm"
							className="absolute top-4 left-4 z-50 bg-red-600/80 hover:bg-red-700/90 text-white"
							onClick={() => handleDelete(images[currentIndex])}>
							<X className="w-4 h-4 mr-1" /> Delete
						</Button>
					)}

					<CarouselContent>
						{images.map((img, index) => (
							<CarouselItem key={index}>
								<div className="flex items-center justify-center h-[80vh] p-4">
									<Image
										src={img}
										alt={`Gallery image ${index + 1}`}
										width={800}
										height={600}
										className="object-contain max-w-full max-h-full rounded-lg"
										priority={index === initialIndex}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					{/* Navigation arrows */}
					{images.length > 1 && (
						<>
							<CarouselPrevious className="left-4 bg-black/50 text-white hover:bg-black/70" />
							<CarouselNext className="right-4 bg-black/50 text-white hover:bg-black/70" />
						</>
					)}

					{/* Image counter */}
					{images.length > 1 && (
						<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
							{currentIndex + 1} / {images.length}
						</div>
					)}
				</Carousel>
			</DialogContent>
		</Dialog>
	)
}
