import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import Header from './Header.tsx'


// Component
function SectionHeader() {
    return <div className={"section__header"}>
        <h2 className={"section__title"}>
            Laat je inspireren
        </h2>
        <p className={"section__cta"}>
            <a data-navigate-routes={JSON.stringify(["/inspiratie"])}>
                Bekijk meer inspiraties
            </a>
        </p>
    </div>
}


export default SectionHeader
