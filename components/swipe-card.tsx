'use client'

import { Profile } from '@/types'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { HeartFilledIcon, MapPin, X } from './icons'
import { useRouter } from 'next/navigation'
import { likeProfile, passProfile } from '@/lib/actions/action.matches'

interface SwipeCardProps {
    profile: Profile
    onSwipe: () => void
    isTopCard?: boolean
}

const SwipeCard = ({ profile, onSwipe, isTopCard = false }: SwipeCardProps) => {
    const [isDragging, setIsDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [loading, setLoading] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const startPos = useRef({ x: 0, y: 0 })
    const router = useRouter()

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    const handleStart = (clientX: number, clientY: number) => {
        if (!isMobile || !isTopCard) return
        setIsDragging(true)
        startPos.current = { x: clientX, y: clientY }
    }

    const handleMove = useCallback((clientX: number, clientY: number) => {
        if (!isDragging || !isMobile || !isTopCard) return

        const deltaX = clientX - startPos.current.x
        const deltaY = clientY - startPos.current.y
        
        setPosition({ x: deltaX, y: deltaY })
        setRotation(deltaX * 0.1) // Slight rotation based on horizontal movement
    }, [isDragging, isMobile, isTopCard])

    const handleEnd = useCallback(async () => {
        if (!isDragging || !isMobile || !isTopCard) return
        
        setIsDragging(false)
        const threshold = 100

        if (Math.abs(position.x) > threshold) {
            // Swipe detected
            setIsAnimating(true)
            const direction = position.x > 0 ? 'right' : 'left'
            
            // Animate card off screen
            setPosition({ 
                x: direction === 'right' ? 1000 : -1000, 
                y: position.y 
            })
            
            // Call database functions
            try {
                if (direction === 'right') {
                    const result = await likeProfile(profile.id)
                    if (result.success) {
                        if (result.isMatch) {
                            toast.success(`${result.message} 💖`, {
                                description: `You and ${profile.name} liked each other!`
                            })
                        } else {
                            toast.success(`You liked ${profile.name}! 💖`)
                        }
                    } else {
                        toast.error(result.message)
                    }
                } else {
                    await passProfile()
                    toast.info('Profile passed')
                }
            } catch (error) {
                console.error('Error processing swipe:', error)
                toast.error('Something went wrong')
            }
            
            setTimeout(() => {
                onSwipe()
                resetCard()
            }, 300)
        } else {
            // Snap back to center
            resetCard()
        }
    }, [isDragging, isMobile, isTopCard, position.x, position.y, onSwipe, profile.id, profile.name])

    const resetCard = () => {
        setPosition({ x: 0, y: 0 })
        setRotation(0)
        setIsAnimating(false)
    }

    const handleLike = async () => {
        if (loading) return
        setLoading(true)
        
        try {
            const result = await likeProfile(profile.id)
            if (result.success) {
                if (result.isMatch) {
                    toast.success(`${result.message} 💖`, {
                        description: `You and ${profile.name} liked each other!`
                    })
                } else {
                    toast.success(`You liked ${profile.name}! 💖`)
                }
                
                if (isMobile && isTopCard) {
                    setIsAnimating(true)
                    setPosition({ x: 1000, y: 0 })
                    setTimeout(() => onSwipe(), 300)
                } else {
                    onSwipe()
                }
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.error('Error liking profile:', error)
            toast.error('Failed to like profile')
        } finally {
            setLoading(false)
        }
    }

    const handlePass = async () => {
        if (loading) return
        setLoading(true)
        
        try {
            await passProfile()
            toast.info('Profile passed')
            
            if (isMobile && isTopCard) {
                setIsAnimating(true)
                setPosition({ x: -1000, y: 0 })
                setTimeout(() => onSwipe(), 300)
            } else {
                onSwipe()
            }
        } catch (error) {
            console.error('Error passing profile:', error)
            toast.error('Failed to pass profile')
        } finally {
            setLoading(false)
        }
    }

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        handleStart(e.clientX, e.clientY)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        handleMove(e.clientX, e.clientY)
    }

    const handleMouseUp = () => {
        handleEnd()
    }

    // Touch events
    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0]
        handleStart(touch.clientX, touch.clientY)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0]
        handleMove(touch.clientX, touch.clientY)
    }

    const handleTouchEnd = () => {
        handleEnd()
    }

    useEffect(() => {
        if (isDragging) {
            const handleGlobalMouseMove = (e: MouseEvent) => {
                handleMove(e.clientX, e.clientY)
            }
            const handleGlobalMouseUp = () => {
                handleEnd()
            }

            document.addEventListener('mousemove', handleGlobalMouseMove)
            document.addEventListener('mouseup', handleGlobalMouseUp)

            return () => {
                document.removeEventListener('mousemove', handleGlobalMouseMove)
                document.removeEventListener('mouseup', handleGlobalMouseUp)
            }
        }
    }, [isDragging, handleMove, handleEnd])

    const cardStyle = isMobile && isTopCard ? {
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        transition: isAnimating ? 'transform 0.3s ease-out' : 'none',
        zIndex: isTopCard ? 10 : 1,
        cursor: isDragging ? 'grabbing' : 'grab'
    } : {}

    const overlayOpacity = Math.abs(position.x) / 200

    return (
        <Card 
            ref={cardRef}
            className={`overflow-hidden border-0 shadow-xl ${
                isMobile 
                    ? 'w-80 h-[500px] absolute top-0 left-1/2 transform -translate-x-1/2 rounded-2xl' 
                    : 'w-65 h-95 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] mt-4 rounded-xl'
            }`}
            style={cardStyle}
            onMouseDown={handleMouseDown}
            onMouseMove={isDragging ? handleMouseMove : undefined}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={!isMobile ? () => router.push(`/profile/${profile.id}`) : undefined}
        >
            {/* Swipe Overlays for Mobile */}
            {isMobile && isTopCard && (
                <>
                    {/* Like Overlay */}
                    <div 
                        className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-200 ${
                            position.x > 50 ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ opacity: position.x > 50 ? overlayOpacity : 0 }}
                    >
                        <div className="bg-green-500 text-white text-4xl font-bold px-8 py-4 rounded-2xl transform rotate-12 shadow-lg border-4 border-white">
                            LIKE
                        </div>
                    </div>
                    
                    {/* Pass Overlay */}
                    <div 
                        className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-200 ${
                            position.x < -50 ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ opacity: position.x < -50 ? overlayOpacity : 0 }}
                    >
                        <div className="bg-red-500 text-white text-4xl font-bold px-8 py-4 rounded-2xl transform -rotate-12 shadow-lg border-4 border-white">
                            NOPE
                        </div>
                    </div>
                </>
            )}

            <CardContent className="h-full relative">
                {/* Profile Image - Full height on mobile, partial on desktop */}
                <div className={`relative rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 ${
                    isMobile ? 'h-full w-full' : 'h-50 w-55 mx-auto'
                }`}>
                    <Avatar className={`${isMobile ? 'h-full w-full rounded-2xl' : 'h-50 w-55 rounded-sm'}`}>
                        <AvatarImage 
                            src={profile.avatar_url || ''} 
                            alt={profile.name}
                            className="object-cover"
                        />
                        <AvatarFallback className={`${isMobile ? 'h-full w-full rounded-2xl text-6xl' : 'h-50 w-55 rounded-sm text-4xl'} bg-gradient-to-br from-pink-500/20 to-purple-500/20`}>
                            {profile.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    
                    {/* Age Badge */}
                    <Badge 
                        variant="secondary" 
                        className="absolute top-4 right-4 bg-black/80 text-white border-0 text-lg px-3 py-1 rounded-full"
                    >
                        {profile.age}
                    </Badge>

                    {/* Mobile: Profile Info Overlay at Bottom */}
                    {isMobile && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white rounded-b-2xl">
                            <h3 className="font-bold text-2xl mb-1">{profile.name}</h3>
                            {profile.location && (
                                <div className="flex items-center text-sm opacity-90 mb-4">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{profile.location}</span>
                                </div>
                            )}
                            
                            {/* Mobile Action Buttons ON the card */}
                            {isTopCard && (
                                <div className="flex justify-center gap-6 mt-4">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="h-14 w-14 rounded-full border-3 border-white bg-white/20 backdrop-blur-sm text-white hover:bg-red-500 hover:border-red-500 shadow-lg transition-all duration-200"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handlePass()
                                        }}
                                        disabled={loading}
                                    >
                                        <X className="h-6 w-6" />
                                    </Button>
                                    
                                    <Button
                                        size="lg"
                                        className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg transition-all duration-200 hover:scale-105"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleLike()
                                        }}
                                        disabled={loading}
                                    >
                                        <HeartFilledIcon className="h-7 w-7" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Desktop: Profile Info Below Image */}
                {!isMobile && (
                    <div className="p-4 space-y-3">
                        {/* Name and Location */}
                        <div>
                            <h3 className="font-semibold text-lg truncate">{profile.name}</h3>
                            {profile.location && (
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    <span className="truncate">{profile.location}</span>
                                </div>
                            )}
                        </div>

                        {/* Desktop Action Buttons - Below the card */}
                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handlePass()
                                }}
                                disabled={loading}
                                className="flex-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                            >
                                <X className="h-4 w-4 mr-1" />
                                Pass
                            </Button>
                            <Button
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleLike()
                                }}
                                disabled={loading}
                                className="flex-1 cursor-pointer bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                            >
                                <HeartFilledIcon className="h-4 w-4 mr-1" />
                                Like
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default SwipeCard