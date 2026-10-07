import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


    
// Component

        function PaginationPage({
            title,
            route,
            page
        }: {
            title: string;
            route: string;
            page: number;
        }) {
            return (
                <a title={title} data-navigate-routes={JSON.stringify([route])}>
                    <span className={"visually-hidden"}>
                        {`
             Pagina
             `}
                    </span>
                    {page}
                </a>
            )
        }
    

export default PaginationPage
