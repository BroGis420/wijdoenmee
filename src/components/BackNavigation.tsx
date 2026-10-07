import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


    
// Component

        function BackNavigation({ route }: { route: string }) {
            return (
                <ul>
                    <li>
                        <a data-navigate-routes={JSON.stringify([route])}>
                            Terug
                        </a>
                    </li>
                </ul>
            )
        }
    

export default BackNavigation
