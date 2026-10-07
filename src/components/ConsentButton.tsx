import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


    
// Component

        function ConsentButton({
            label,
            variant
        }: {
            label: string;
            variant: "success" | "success-var";
        }) {
            return (
                <button type={"button"} className={`cm-btn cm-btn-${variant}`}>
                    {label}
                </button>
            )
        }
    

export default ConsentButton
