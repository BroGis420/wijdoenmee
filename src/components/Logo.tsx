import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


// Component
function Logo() {
    return <a data-navigate-routes={JSON.stringify(["/"])}>
        <span className={"logo__text"}>
            <span className={"logo__line"}>Wij doen</span>
            <span className={"logo__line"}>mee,</span>
            <span className={"logo__sub"}>rond Gent</span>
        </span>
    </a>
}


export default Logo
