import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


    
// Component

        function PaginationLink({
            title,
            hiddenLabel,
            label,
            rel
        }: {
            title: string;
            hiddenLabel: string;
            label: string;
            rel?: "next" | "prev";
        }) {
            return (
                <a
                    title={title}
                    {...(rel !== undefined ? { rel } : {})}
                    data-navigate-routes={JSON.stringify(["/themas/inschrijving"])}
                >
                    <span className={"visually-hidden"}>
                        {hiddenLabel}
                    </span>
                    <span>
                        {label}
                    </span>
                </a>
            )
        }
    

export default PaginationLink
