import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


// Component
function MenuToggle() {
    return <button className={"menu__toggle"}>
        <span>
            Menu
        </span>
    </button>
}


export default MenuToggle
