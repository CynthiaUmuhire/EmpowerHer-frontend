import React from 'react'

export default function CenteredContent({ children }: { children: React.ReactNode }) {
    return (
        <section id='centeredContent' className='max-w-7xl mx-auto h-full px-10 md:px-0'>
            {children}
        </section>
    )
}
