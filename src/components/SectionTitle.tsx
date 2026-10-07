import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


    
// Component

        function SectionTitle({
            title,
            className,
            headingId
        }: {
            title: string;
            className: string;
            headingId?: string;
        }) {
            return (
                <div className={className}>
                    <h2 {...(headingId !== undefined ? { id: headingId } : {})}>
                        {title}
                    </h2>
                </div>
            )
        }
    

export default SectionTitle
