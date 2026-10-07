import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


// Component
function MainContent() {
    return <a id={"main-content"} tabIndex={"-1"} data-navigate-routes={JSON.stringify(["/"])}>
    </a>
}


export default MainContent
