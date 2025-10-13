'use client'

import { Profile } from '@/types'
import { useState, useEffect } from 'react'
import SwipeCard from './swipe-card'
import { HeartFilledIcon } from './icons'

interface DiscoverStackProps {
    matches: Profile[]
}

const DiscoverStack = ({ matches }: DiscoverStackProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleSwipe = () => {
        setCurrentIndex(prev => prev + 1)
    }

    const visibleProfiles = matches.slice(currentIndex)

    if (visibleProfiles.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full p-8 mb-6">
                    <HeartFilledIcon className="h-20 w-20 text-pink-500 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    No more matches!
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                    You&apos;ve seen all available profiles. Check back later for new people or adjust your preferences to see more matches.
                </p>
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className="flex flex-col items-center min-h-screen px-4 ">
                {/* Mobile Swipe Stack */}
                <div className="relative w-full max-w-sm h-[620px] mt-4">
                    {visibleProfiles.slice(0, 3).map((profile: Profile, index: number) => (
                        <div
                            key={profile.id}
                            className="absolute inset-0"
                            style={{
                                zIndex: 10 - index,
                                transform: `scale(${1 - index * 0.03}) translateY(${index * 8}px)`,
                                opacity: 1 - index * 0.15
                            }}
                        >
                            <SwipeCard
                                profile={profile}
                                onSwipe={handleSwipe}
                                isTopCard={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Desktop Grid Layout
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleProfiles.map((profile: Profile) => (
                    <SwipeCard
                        key={profile.id}
                        profile={profile}
                        onSwipe={handleSwipe}
                        isTopCard={false}
                    />
                ))}
            </div>
        </div>
    )
}

export default DiscoverStack