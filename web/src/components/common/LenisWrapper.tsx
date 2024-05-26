'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Lenis } from 'lenis/react'

type LenisWrapperProps = {
    children: React.ReactNode
}
export default function LenisWrapper({ children }: LenisWrapperProps) {
    const [isMounted, setIsMounted] = useState(false)
    const reduce = useReducedMotion()
    const isMedia = isMounted && !reduce

    useEffect(() => {
        window.innerWidth > 640 ? setIsMounted(true) : setIsMounted(false)
    }, [isMounted])
    return (
        <>
            {isMedia && (
                <Lenis
                    root
                    options={{
                        duration: 1.5,
                        lerp: 0.087,
                        syncTouch: true,
                        smoothWheel: true,
                    }}
                />
            )}
            {children}
        </>
    )
}
